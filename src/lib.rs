#[macro_use]
mod utils;
mod pcb;

pub mod core_math;
use core_math::PointInPolyResult;
use core_math::Poly;

pub mod layer_defs;
use layer_defs::LayerSet;
use layer_defs::LayerShapes;

extern crate js_sys;

use delaunator;

use serde::{Deserialize, Serialize};

use core_math::Outline;
use core_math::PointPath;
use core_math::Ray;
use core_math::VectorPath;
use core_math::EPSILON;
use std::cell::RefCell;
use std::collections::HashMap;
use std::collections::HashSet;
use std::f32::consts::PI;
use std::hash;
use wasm_bindgen::prelude::*;

extern crate nalgebra as na;
use na::{Matrix4, Point3, Vector3};

const KEY_DIM: [f32; 2] = [18.0, 18.0];
const BASE_1U: [f32; 2] = [19.05, 19.05];
const BEZEL_GAP: f32 = BASE_1U[0] - KEY_DIM[0];
const SWITCH_CUT: [f32; 2] = [14.0, 14.0];

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init_wasm_env() {
    utils::set_panic_hook();
}

#[derive(Debug)]
pub enum DeviceType {
    Key,
    EC11,
    OLED,
}

impl Default for DeviceType {
    fn default() -> Self {
        DeviceType::Key
    }
}

// #[wasm_bindgen]
#[derive(Debug, Default)]
pub struct KeyData {
    id: u32,
    case_id: u32,
    device_type: DeviceType,
    position: Vector3<f32>,
    rotation_rads: f32,
    size: Vector3<f32>,
    bounds: core_math::Bounds2,
    geo_groups: HashMap<String, Vec<core_math::Poly>>,
    flip_stab: bool,
}

impl KeyData {
    pub fn new(device_type: DeviceType, id: u32, case_id: u32) -> KeyData {
        KeyData {
            id,
            case_id,
            device_type,
            ..Default::default()
        }
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct CaseGeometry {
    keys: Vec<KeyData>,
    keygroup_outlines: Vec<Outline>,
    combined_outline: Outline,
    convex_hull: Outline,
    bounds: core_math::Bounds2,
    layer_definitions: LayerSet,
}

#[derive(Debug, Clone, Copy, Serialize)]
struct DelaunayEdge {
    this_outline_idx: usize,
    this_point_idx: usize,
    other_outline_idx: usize,
    other_point_idx: usize,
    dist: f32,
    min_theta: f32,
    max_theta: f32,
}

#[derive(Debug, Serialize)]
struct DebugLineOutput {
    p0: Point3<f32>,
    p1: Point3<f32>,
}

// #[wasm_bindgen(module = "/src/boardData.js")]
// extern "C" {
//     fn bdLayerGetValue(i: i32, l: &str, k: &str) -> f32;
// }

#[wasm_bindgen]
impl CaseGeometry {
    pub fn new() -> CaseGeometry {
        CaseGeometry {
            keys: Vec::new(),
            keygroup_outlines: Vec::new(),
            combined_outline: Outline::new(),
            convex_hull: Outline::new(),
            bounds: core_math::Bounds2::new(),
            layer_definitions: LayerSet::new(),
        }
    }

    pub fn set_layer_override(&mut self, layer_name: &str, thickness: f32) {
        self.layer_definitions.set_layer_bezel_thickness(layer_name, thickness);
    }

    pub fn add_key(
        &mut self,
        id: u32,
        device_type_string: &str,
        x: f32,
        y: f32,
        w: f32,
        h: f32,
        rot_angle: f32,
    ) {
        let device_type = match device_type_string {
            "ec11" => DeviceType::EC11,
            "oled" => DeviceType::OLED,
            _ => DeviceType::Key,
        };
        let mut kd = KeyData::new(device_type, id, 0);

        kd.position = Vector3::new(x, 0.0, -y);
        kd.size = Vector3::new(w, 0.0, h);
        kd.rotation_rads = rot_angle;

        self.keys.push(kd);
    }

    fn get_outline_groups(&self, group_name: &str) -> Vec<Outline> {
        let groups = self.find_overlapping_groups(group_name);
        let mut outlines = Vec::new();

        for group in groups {
            // log!("Group: {:?}", group);
            let outline = CaseGeometry::get_outline_of_poly_group(group, false);
            // log!("Outline: {:?}", outline);
            outlines.push(outline);
        }
        outlines
    }

    pub fn process_layout(&mut self) -> JsValue {
        self.keygroup_outlines = self.get_outline_groups("bezel_holes");

        let mut v_points = Vec::new();
        let mut point_remap = Vec::new();
        let mut outline_connections = Vec::new();
        for (i_outline, outline) in self.keygroup_outlines.iter().enumerate() {
            outline_connections.push(i_outline);
            for (i_point, point) in outline.points.iter().enumerate() {
                let v_point = delaunator::Point {
                    x: point.x as f64,
                    y: point.z as f64,
                };
                v_points.push(v_point);
                point_remap.push((i_outline, i_point));
            }
        }
        let v_d = delaunator::triangulate(&v_points);

        let mut exterior_edge_map: HashMap<usize, HashMap<usize, Vec<DelaunayEdge>>> =
            HashMap::new();

        for t_i in 0..v_d.triangles.len() {
            let t_j = if (t_i + 1) % 3 > 0 { t_i + 1 } else { t_i - 2 };
            let p_i = v_d.triangles[t_i];
            let p_j = v_d.triangles[t_j];

            let (lP_outline, lP_o_idx) = point_remap[p_i];
            let (rP_outline, rP_o_idx) = point_remap[p_j];

            let lP = self.keygroup_outlines[lP_outline].points[lP_o_idx];
            let rP = self.keygroup_outlines[rP_outline].points[rP_o_idx];

            let rToL = lP - rP;
            let lToR = rP - lP;
            let dist = rToL.magnitude();
            if dist < EPSILON {
                continue;
            }

            // log!("og {:?}: {:?} to {:?}: {:?}", i, lP, *h_edge, rP);
            let mut is_exterior_edge = false;
            let d = (rP_o_idx as i64 - lP_o_idx as i64).abs();
            if lP_outline == rP_outline
                && (d == 1 || d == self.keygroup_outlines[lP_outline].points.len() as i64)
            {
                is_exterior_edge = true;
            } else {
                let checkExterior = |cP, cP_outline: usize, cP_o_idx, pToL: Vector3<f32>| -> bool {
                    let o_len = self.keygroup_outlines[cP_outline].points.len();
                    let prevToC: Vector3<f32> = cP
                        - self.keygroup_outlines[cP_outline].points[(cP_o_idx - 1 + o_len) % o_len];
                    let cToNext: Vector3<f32> =
                        self.keygroup_outlines[cP_outline].points[(cP_o_idx + 1) % o_len] - cP;

                    let nextNorm = Vector3::new(cToNext.z, 0f32, -cToNext.x);
                    let prevNorm = Vector3::new(prevToC.z, 0f32, -prevToC.x);

                    // todo: figure out epsilons
                    let isAcute = prevNorm.dot(&cToNext) > EPSILON;

                    let pDot = pToL.dot(&prevNorm);
                    let nDot = pToL.dot(&nextNorm);

                    return (pDot > EPSILON && (!isAcute || nDot > EPSILON))
                        || (pDot < EPSILON && !isAcute && nDot > EPSILON);
                };

                let mut isExterior = checkExterior(rP, rP_outline, rP_o_idx, rToL);
                if lP_outline != rP_outline {
                    isExterior = isExterior && checkExterior(lP, lP_outline, lP_o_idx, lToR);
                }

                if !isExterior {
                    // skip this edge because it's inside one of the outlines
                    continue;
                }
            }

            let centerP = rP + (lP - rP).scale(0.5);

            let circumscribedRadius = |a: f32, b: f32, c: f32| -> f32 {
                let v: f32 = (a + b + c) * (b + c - a) * (c + a - b) * (a + b - c);
                let sqrt = v.sqrt();
                if v < 0f32 || sqrt < EPSILON {
                    return 10000000.0f32;
                }
                return (a * b * c) / sqrt;
            };

            let rNorm = Vector3::new(rToL.z, 0f32, -rToL.x).normalize();

            let mut minThetaL = dist / 2f32;
            let mut maxThetaL = 1000000f32;
            let mut minThetaR = dist / 2f32;
            let mut maxThetaR = 1000000f32;

            'outer: for (i_outline, outline) in self.keygroup_outlines.iter().enumerate() {
                for (i_point, point) in outline.points.iter().enumerate() {
                    if (i_outline == lP_outline && i_point == lP_o_idx)
                        || (i_outline == rP_outline && i_point == rP_o_idx)
                    {
                        continue;
                    }

                    let rToP = point - rP;
                    let lToP = point - lP;
                    let lPDist = lToP.magnitude();
                    let rPDist = rToP.magnitude();

                    if lPDist < EPSILON || rPDist < EPSILON {
                        continue;
                    }

                    let pToCDist = (centerP - point).magnitude();

                    let nDot = rNorm.dot(&rToP);

                    let circleRadius = circumscribedRadius(lPDist, rPDist, dist);

                    if pToCDist * 2f32 <= dist {
                        // between the two points!
                        // one side or the other is ALWAYS inside, the other is a minimal value (theta needs to be bigger
                        // and as the circle grows it approaches a line between the main points, which excludes a half space)
                        if nDot >= 0f32 {
                            minThetaL = minThetaL.max(circleRadius);
                            maxThetaR = 0f32;
                        } else {
                            minThetaR = minThetaR.max(circleRadius);
                            maxThetaL = 0f32;
                        }
                    } else {
                        if nDot >= 0f32 {
                            maxThetaR = maxThetaR.min(circleRadius);
                        } else {
                            maxThetaL = maxThetaL.min(circleRadius);
                        }
                    }

                    // this means that there's a point between the endpoints that will always be covered by a circle that direction.
                    if (maxThetaR - minThetaR) < EPSILON && (maxThetaL - minThetaL) < EPSILON {
                        break 'outer;
                    }
                }
            }

            let mut minTheta = minThetaL;
            let mut maxTheta = maxThetaL;
            // lets just always bias to the larger side
            if maxThetaR >= maxThetaL {
                minTheta = minThetaR;
                maxTheta = maxThetaR;
            }
            minTheta = (minTheta * 100000f32).round() / 100000f32;
            maxTheta = (maxTheta * 100000f32).round() / 100000f32;
            maxTheta = maxTheta.min(10000f32);

            if is_exterior_edge {
                minTheta = 0f32;
            }

            exterior_edge_map
                .entry(lP_outline)
                .or_default()
                .entry(lP_o_idx)
                .or_default()
                .push(DelaunayEdge {
                    this_outline_idx: lP_outline,
                    this_point_idx: lP_o_idx,
                    other_outline_idx: rP_outline,
                    other_point_idx: rP_o_idx,
                    dist: dist,
                    min_theta: minTheta,
                    max_theta: maxTheta,
                });

            exterior_edge_map
                .entry(rP_outline)
                .or_default()
                .entry(rP_o_idx)
                .or_default()
                .push(DelaunayEdge {
                    this_outline_idx: rP_outline,
                    this_point_idx: rP_o_idx,
                    other_outline_idx: lP_outline,
                    other_point_idx: lP_o_idx,
                    dist: dist,
                    min_theta: minTheta,
                    max_theta: maxTheta,
                });
        }

        // let outlineLinks:  = HashMap::new();

        let mut outline_to_outline_links: HashMap<usize, HashMap<usize, Vec<DelaunayEdge>>> =
            HashMap::new();
        for (outline_idx, outline_edge_map) in exterior_edge_map {
            for (point_idx, mut edges) in outline_edge_map {
                let p = self.keygroup_outlines[outline_idx].points[point_idx];

                let o_len = self.keygroup_outlines[outline_idx].points.len();
                let p_to_prev = (p - self.keygroup_outlines[outline_idx].points
                    [(point_idx - 1 + o_len) % o_len])
                    .normalize();
                let prev_angle = core_math::get_rot_from_normal(&p_to_prev);

                let comp_value = std::f32::consts::PI * 2f32 - prev_angle + EPSILON;

                edges.sort_by(|a, b| {
                    let a_p = self.keygroup_outlines[a.other_outline_idx].points[a.other_point_idx];
                    let b_p = self.keygroup_outlines[b.other_outline_idx].points[b.other_point_idx];
                    let p_to_a = (core_math::get_rot_from_normal(&(p - a_p).normalize())
                        + comp_value)
                        % (std::f32::consts::PI * 2f32);
                    let p_to_b = (core_math::get_rot_from_normal(&(p - b_p).normalize())
                        + comp_value)
                        % (std::f32::consts::PI * 2f32);
                    return p_to_a.partial_cmp(&p_to_b).unwrap();
                });
                // ok we have a radially sorted list of lines, 0 is the original entry and the end is original eit

                for edge in edges {
                    if outline_idx != edge.other_outline_idx {
                        let o_p = self.keygroup_outlines[edge.other_outline_idx].points
                            [edge.other_point_idx];
                        let o_min = outline_idx.min(edge.other_outline_idx);
                        let o_max = outline_idx.max(edge.other_outline_idx);
                        // log!("adding o {:?} to o {:?} link  {:?}", o_min, o_max, edge);
                        outline_to_outline_links
                            .entry(o_min)
                            .or_default()
                            .entry(o_max)
                            .or_default()
                            .push(edge);
                    }
                }
            }
        }

        let mut outlineOutlinePairs = Vec::new();
        // this might not work, we might need an actual o -> o linkage
        for (ooId_first, other_outlines) in outline_to_outline_links {
            for (ooId_second, mut oo_edges) in other_outlines {
                // log!("{:?}", oo_edges);
                // sort the edges so the shortest ones are first
                oo_edges.sort_by(|a, b| a.dist.partial_cmp(&b.dist).unwrap());

                let mut linkedPts = HashSet::new();
                let mut minEdges = Vec::new();
                let edgeDiffMax = 2f32; // 2 mm
                let edgeMin = 19.05f32;
                let edge_start = (oo_edges[0].dist + edgeDiffMax).max(edgeMin);

                // find all of the edges that are within some epsilon (the edgeDiffMax) of the shortest edge
                for e in &oo_edges {
                    // log!("checking edge o {:?} i {:?} to o {:?} i {:?} dist {:?} edge_start {:?}", e.this_outline_idx, e.this_point_idx,
                    //     e.other_outline_idx, e.other_point_idx, e.dist, edge_start);
                    if linkedPts.len() >= 4 && e.dist > edge_start {
                        break;
                    }

                    if !linkedPts.contains(&(e.this_outline_idx, e.this_point_idx))
                        && !linkedPts.contains(&(e.other_outline_idx, e.other_point_idx))
                    {
                        linkedPts.insert((e.this_outline_idx, e.this_point_idx));
                        linkedPts.insert((e.other_outline_idx, e.other_point_idx));
                        minEdges.push(e);
                    }
                }

                // out of the set of short edges, find the two that are the farthest apart (in the center, maybe do seg->seg in the future?)
                let mut max_dist = -1f32;
                let mut best_edge_idxs = (usize::MAX, usize::MAX);
                for (i, e) in minEdges.iter().enumerate() {
                    for (other_i, other_e) in minEdges.iter().enumerate() {
                        if e.this_outline_idx != other_e.this_outline_idx
                            || e.this_point_idx != other_e.this_point_idx
                        {
                            let e_p_0 =
                                self.keygroup_outlines[e.this_outline_idx].points[e.this_point_idx];
                            let e_p_1 = self.keygroup_outlines[e.other_outline_idx].points
                                [e.other_point_idx];

                            let o_p_0 = self.keygroup_outlines[other_e.this_outline_idx].points
                                [other_e.this_point_idx];
                            let o_p_1 = self.keygroup_outlines[other_e.other_outline_idx].points
                                [other_e.other_point_idx];

                            let e_center = e_p_0 + (e_p_1 - e_p_0).scale(0.5);
                            let other_e_center = o_p_0 + (o_p_1 - o_p_0).scale(0.5);
                            let dist = (e_center - other_e_center).magnitude_squared();
                            if dist > max_dist {
                                max_dist = dist;
                                best_edge_idxs = (i, other_i);
                            }
                        }
                    }
                }

                if best_edge_idxs.0 != usize::MAX && best_edge_idxs.1 != usize::MAX {
                    // output_lines.push(DebugLineOutput{ p0: p, p1: o_p });
                    // log!("outline {:?} {:?} pair edge {:?} {:?} len {:?} from {:?}", ooId_first, ooId_second, best_edge_idxs.0, best_edge_idxs.1, minEdges.len(), oo_edges.len());
                    outlineOutlinePairs.push((
                        (ooId_first, ooId_second),
                        (*minEdges[best_edge_idxs.0], *minEdges[best_edge_idxs.1]),
                    ));
                } else {
                    // log!("NO OUTLINE {:?} {:?} pair len {:?} from {:?}", ooId_first, ooId_second, minEdges.len(), oo_edges.len());
                }
            }
        }

        outlineOutlinePairs.sort_by(|a, b| {
            (a.1 .0.dist + a.1 .1.dist)
                .partial_cmp(&(b.1 .0.dist + b.1 .1.dist))
                .unwrap()
        });
        // log!("pairs {:?}", outlineOutlinePairs);

        let mut linking_edges: HashMap<(usize, usize), Vec<(usize, usize)>> = HashMap::new();

        for ooPair in outlineOutlinePairs {
            // log!("{:?}", ooPair);
            // log!("connections {:?}", outline_connections);
            let fixed_group_0 = outline_connections[ooPair.0 .0];
            let fixed_group_1 = outline_connections[ooPair.0 .1];
            // if this edge pair is very short OR the two groups aren't connected yet, connect them.
            // this breaks when an outline pair only has one edge connecting it
            // (perhaps because the other edge is closer to a big group)
            if (ooPair.1.0.dist + ooPair.1.1.dist) < 20f32 || fixed_group_0 != fixed_group_1 {
                // log!("collapsing {:?} into {:?}", fixed_group_1, fixed_group_0);
                let e0 = ooPair.1 .0;
                let e1 = ooPair.1 .1;
                linking_edges
                    .entry((e0.this_outline_idx, e0.this_point_idx))
                    .or_default()
                    .push((e0.other_outline_idx, e0.other_point_idx));
                linking_edges
                    .entry((e0.other_outline_idx, e0.other_point_idx))
                    .or_default()
                    .push((e0.this_outline_idx, e0.this_point_idx));

                linking_edges
                    .entry((e1.this_outline_idx, e1.this_point_idx))
                    .or_default()
                    .push((e1.other_outline_idx, e1.other_point_idx));
                linking_edges
                    .entry((e1.other_outline_idx, e1.other_point_idx))
                    .or_default()
                    .push((e1.this_outline_idx, e1.this_point_idx));

                for i in 0..outline_connections.len() {
                    if outline_connections[i] == fixed_group_1 {
                        outline_connections[i] = fixed_group_0;
                    }
                }
            }
        }

        // this is dumb - workaround the borrow checker
        let mut p_idx_workaround = Vec::new();
        for p_idx in linking_edges.keys() {
            p_idx_workaround.push(p_idx.clone());
        }

        // radially sort the edges at each point
        for p_idx in p_idx_workaround {
            let mut edges = linking_edges.get_mut(&p_idx).unwrap();
            if edges.len() > 1 {
                let p = self.keygroup_outlines[p_idx.0].points[p_idx.1];

                let o_len = self.keygroup_outlines[p_idx.0].points.len();
                let p_to_prev: Vector3<f32> = (p - self.keygroup_outlines[p_idx.0].points
                    [(p_idx.1 - 1 + o_len) % o_len])
                    .normalize();

                let prev_angle = core_math::get_rot_from_normal(&p_to_prev);
                let comp_val = std::f32::consts::PI * 2f32 - prev_angle + EPSILON;

                edges.sort_by(|a, b| {
                    let p_a = self.keygroup_outlines[a.0].points[a.1];
                    let p_b = self.keygroup_outlines[b.0].points[b.1];
                    let p_to_a = (core_math::get_rot_from_normal(&(p - p_a).normalize())
                        + comp_val)
                        % (std::f32::consts::PI * 2f32);
                    let p_to_b = (core_math::get_rot_from_normal(&(p - p_b).normalize())
                        + comp_val)
                        % (std::f32::consts::PI * 2f32);
                    return p_to_a.partial_cmp(&p_to_b).unwrap();
                });
            }
        }

        // use the points on the convex hull to set the bounds and find the first point
        let mut first_p = (0usize, 0usize);
        let mut convex_lookup = HashSet::new();
        self.bounds = core_math::Bounds2::new();
        for p_remap_idx in v_d.hull {
            let p_idx = point_remap[p_remap_idx];
            let p = self.keygroup_outlines[p_idx.0].points[p_idx.1];

            self.bounds.mins.x = self.bounds.mins.x.min(p.x);
            self.bounds.maxs.x = self.bounds.maxs.x.max(p.x);
            self.bounds.mins.y = self.bounds.mins.x.min(p.y);
            self.bounds.maxs.y = self.bounds.maxs.x.max(p.y);

            convex_lookup.insert(p_idx);

            if !linking_edges.contains_key(&p_idx) {
                first_p = p_idx;
            }
        }

        let mut this_p = first_p;
        let mut last_p = this_p;

        let mut ordered_convex_hull = Vec::new();
        let mut real_outline = Vec::new();
        let mut outline_idxs = HashSet::new();
        let mut first_iteration = true;

        while this_p != first_p || first_iteration {
            first_iteration = false;

            // if this is on the convex hull add it to the ordered hull here
            if convex_lookup.contains(&this_p) {
                ordered_convex_hull.push(this_p);
            }

            real_outline.push(this_p);
            // backup checking
            if outline_idxs.contains(&this_p) {
                log!("loop detected in outline generation!");
                break;
            }
            outline_idxs.insert(this_p);

            let outline_len = self.keygroup_outlines[this_p.0].points.len();
            let mut linked = false;

            if linking_edges.contains_key(&this_p) {
                let mut found_last =
                    (last_p.0 == this_p.0) && ((last_p.1 + 1) % outline_len == this_p.1);
                for edge in linking_edges.get(&this_p).unwrap() {
                    if last_p.0 == edge.0 && last_p.1 == edge.1 {
                        found_last = true;
                    } else if found_last && !outline_idxs.contains(&(edge.0, edge.1)) {
                        last_p = this_p;
                        this_p = *edge;
                        linked = true;
                    }
                }
            }

            if !linked {
                last_p = this_p;
                this_p = (this_p.0, ((this_p.1 + 1) % outline_len));
            }
        }

        // log!("outline! {:?}", real_outline);

        let mut output_lines = Vec::new();
        for i in 0..real_outline.len() {
            let p_idx = real_outline[i];
            let p1_idx = real_outline[(i + 1) % real_outline.len()];
            let p = self.keygroup_outlines[p_idx.0].points[p_idx.1];
            let p1 = self.keygroup_outlines[p1_idx.0].points[p1_idx.1];
            output_lines.push(DebugLineOutput { p0: p, p1: p1 });
        }

        self.combined_outline = Outline::new();
        for p_idx in real_outline {
            let p = self.keygroup_outlines[p_idx.0].points[p_idx.1];
            self.combined_outline.points.push(p);
        }

        self.convex_hull = Outline::new();
        for p_idx in ordered_convex_hull {
            let p = self.keygroup_outlines[p_idx.0].points[p_idx.1];
            self.convex_hull.points.push(p);
        }

        // log!("Voronoi: {:?}", v_d);
        // JsValue::from_serde(&self.combined_outline.gen_offset_outline(0f32)).unwrap()
        JsValue::from_serde(&0.0).unwrap()
    }

    fn get_port_cut(&self) -> Poly {
        let bezel_thickness = 10f32;
        let port_dim = [15f32 / 2f32, bezel_thickness * 2f32];

        // tuning variables
        let usb_port_centered = true;
        let usb_port_pos = 4f32;

        let port_pos = if usb_port_centered {
            self.bounds.mins[0] + (self.bounds.maxs[0] - self.bounds.mins[0]) / 2f32
        } else {
            usb_port_pos * BASE_1U[0]
        };

        let kPos = [port_pos, self.bounds.maxs[1] + bezel_thickness / 2f32];
        let kXform = Matrix4::new_translation(&Vector3::new(kPos[0], 0f32, kPos[1]));
        // if (k.rotation_angle != 0) {
        //     kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * BASE_1U[0], 0, k.rotation_y * BASE_1U[1]));
        //     kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
        //     kXform = kXform.multiply(Matrix.Translation(k.rotation_x * BASE_1U[0], 0, -k.rotation_y * BASE_1U[1]));
        // }

        return Poly::new_rect_poly(port_dim[0], port_dim[1], kXform);
    }

    pub fn process_case(&self) -> JsValue {
        let mut case_output = CaseOutput::new();

        for outline in &self.keygroup_outlines {
            let keygroup_fillet_radius = 1f32;
            let vector_path =
                outline.offset_and_fillet(0.0, &vec![keygroup_fillet_radius; outline.points.len()], false);
            let points = vector_path.gen_points(4i32);
            case_output.bezel_keygroup_cuts.vector.push(vector_path);
            case_output.bezel_keygroup_cuts.points.push(points);
        }

        let plate_cut_groups = self.get_outline_groups("plate_cuts");

        for outline in &plate_cut_groups {
            let plate_cut_fillet_radius = 0.5f32;
            let vector_path =
                outline.offset_and_fillet(0.0, &vec![plate_cut_fillet_radius; outline.points.len()], false);
            let points = vector_path.gen_points(4i32);
            case_output.plate_cuts.vector.push(vector_path);
            case_output.plate_cuts.points.push(points);
        }

        let bounds_rectangle: [Point3<f32>; 4] = [
            Point3::new(self.bounds.mins.x, 0f32, self.bounds.mins.y),
            Point3::new(self.bounds.maxs.x, 0f32, self.bounds.mins.y),
            Point3::new(self.bounds.maxs.x, 0f32, self.bounds.maxs.y),
            Point3::new(self.bounds.mins.x, 0f32, self.bounds.maxs.y),
        ];
        // find the lerp targets from convex hull to the bounds rectangle

        let mut convex_to_corner_dists: [f32; 4] = [1000000f32, 1000000f32, 1000000f32, 1000000f32];
        //find the 4 convex hull points closest to each rectangular corner, and then map the points between them on the lines between the corners
        let mut convex_to_rect_corner_points: [usize; 4] = [0, 0, 0, 0];

        for i in 0..self.convex_hull.points.len() {
            let p = self.convex_hull.points[i];

            for r in 0..4 {
                let dist = (p - bounds_rectangle[r]).magnitude();
                if dist < convex_to_corner_dists[r] {
                    convex_to_rect_corner_points[r] = i;
                    convex_to_corner_dists[r] = dist;
                }
            }
        }

        // let edge_lerp_targets = vec![Vector3::new(); self.convex_hull.points.len()];

        for i in 0..4 {
            let start_idx = convex_to_rect_corner_points[i];
            let mut end_idx = if i < 3 {
                convex_to_rect_corner_points[i]
            } else {
                convex_to_rect_corner_points[0]
            };
            if end_idx < start_idx {
                end_idx += self.convex_hull.points.len();
            }

            let start_point = bounds_rectangle[i];
            let end_point = if i < 3 {
                bounds_rectangle[i]
            } else {
                bounds_rectangle[0]
            };

            let mut edge_line = end_point - start_point;
            let edge_line_len = edge_line.magnitude();
            edge_line = edge_line.normalize();

            for j in (start_idx + 1)..end_idx {
                //         targets[convexHull[j%convexHull.length].pointIdx] = coremath.nearestPointOnLine(pThis,line,convexHull[j%convexHull.length]);
                //         // targets[j%convexHull.length] = pThis.add(line.scale((j-iThis)*step));
                // edge_lerp_targets[j % ] =
            }
            //     targets[convexHull[iThis].pointIdx] = pThis;
        }

        // let minBezelThickness = 100000.0;
        // let maxCornerFillet = 0.0;
        // let maxConcavity = -1.0;
        // let maxConcaveLayer = null;
        let mut fixed_outlines = Vec::new();
        for i in 0..self.layer_definitions.layer_definitions.len() {
            let layer_def = &self.layer_definitions.layer_definitions[i];
            //     let temp_outline = Vec::new();
            //     for p in self.combined_outline {
            //         lRD.outline.push(p);
            //     }

            // const concavity = boardData.layerGetValue(cBD, layerName, "bezelConcavity");
            // const convexity = 1.0-concavity;

            // let maxConcavityDepth = 0;
            // for(const p of layoutData.minOutline) {
            //     maxConcavityDepth = Math.max(maxConcavityDepth,p.concavityDepth);
            // }
            // const specificConcavityDepth = (1+maxConcavityDepth)*concavity;
            // const targetConcavityDepth = Math.floor(specificConcavityDepth);
            // const concavityRem = specificConcavityDepth - targetConcavityDepth;

            // for(const p of layoutData.minOutline) {
            //     if(p.concavityDepth < targetConcavityDepth) {
            //         lRD.outline.push(p);
            //     } else if(p.concavityDepth == targetConcavityDepth) {
            //         // lerp here.
            //         if(p.concavityDepth === 0) {
            //             lRD.outline.push(p.scale(concavityRem).add(cRD.outlineTargets[p.pointIdx].scale(1.0-concavityRem)));
            //             // lRD.outline.push(p);
            //         }
            //         else {
            //             lRD.outline.push(p.add(p.lerpTarget.scale(1.0-concavityRem)));
            //         }
            //     }
            // }

            // This is if we don't have the concavity depth stuff
            // lRD.outline = [...cRD.convexHull];
            // for(let iP = 0; iP < lRD.outline.length; iP++) {
            //     lRD.outline[iP] = lRD.outline[iP].scale(concavity).add(cRD.outlineTargets[iP].scale(convexity));
            // }

            // if(layerDef.tuneable !== null && concavity > maxConcavity) {
            //     maxConcavity = concavity;
            //     maxConcaveLayer = lRD;
            // }

            // if(cBD.forceSymmetrical) {
            //     let midPoint = (bounds.maxs[0] - bounds.mins[0]) * 0.5 + bounds.mins[0];
            //     let cvPs = [];
            //     for(let oP of lRD.outline) {
            //         cvPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
            //     }
            //     cvPs.reverse();

            //     const caseCornerFillet = boardData.layerGetValue(cBD, layerName, "caseCornerFillet");
            //     let outlineFillets = (new Array(lRD.outline.length)).fill(caseCornerFillet);
            //     const combined = coremath.combineOutlines(lRD.outline,outlineFillets,cvPs,outlineFillets,caseCornerFillet,false);
            //     if(false && layerName === "bezel") {
            //         let red = new Color4(1,0,0,1);
            //         let blue = new Color4(0,0,1,1);
            //         let green = new Color4(0,1,0,1);
            //         let yellow = new Color4(1,1,0,1);
            //         gfx.drawDbgOutline("outline_prev",lRD.outline,blue,blue,true);
            //         gfx.drawDbgOutline("outline_rev",cvPs,red,red,true);
            //         gfx.drawDbgOutline("outline_done",combined.outline,yellow,yellow,true);
            //     }

            //     lRD.outline = combined.outline;
            // }

            // let bezelThickness = bdLayerGetValue(0, &layer_def.name, "bezelThickness");
            let bezelThickness = match self.layer_definitions.layer_overrides[i].bezel_thickness { Some(v) => v, None => 8.0f32 }; // boardData.layerGetValue(cBD, layerName, "bezelThickness");
            let caseCornerFillet = 1.0f32; // Math.min(bezelThickness,boardData.layerGetValue(cBD, layerName, "caseCornerFillet"));
                                           // if(layerDef.tuneable !== null) {
                                           //     maxCornerFillet = Math.max(maxCornerFillet,caseCornerFillet);
                                           //     minBezelThickness = Math.min(minBezelThickness,bezelThickness);
                                           // }

            fixed_outlines.push(self.combined_outline.gen_offset_outline(bezelThickness).gen_fixed_outline());
        }

        let port_cut = self.get_port_cut();
        let port_outline = port_cut.to_outline();
        // addScrewHoles(cRD, cBD, minBezelThickness, maxCornerFillet, maxConcaveLayer.outline, "caseFrame", tesselatedGeo);
        // getFeet(bd, cRD, cBD);

        let mut fixed_outline_idx = 0;

        for layer_def in &self.layer_definitions.layer_definitions {
            let mut layer_output = LayerOutput::new(layer_def.name.clone());
            let mut vector_geos = HashMap::new();
            let fixed_outline = &fixed_outlines[fixed_outline_idx];
            fixed_outline_idx += 1;

            let bezel_corner_fillet = 1f32;
            let pcb_outline_geo = self.combined_outline.offset_and_fillet(
                0.4f32,
                &vec![bezel_corner_fillet; self.combined_outline.points.len()],
                false,
            );
            vector_geos.insert(LayerShapes::PCBOutline, pcb_outline_geo);

            let cavity_inner_geo = self.combined_outline.offset_and_fillet(
                0.5f32,
                &vec![bezel_corner_fillet; self.combined_outline.points.len()],
                false,
            );
            vector_geos.insert(LayerShapes::CavityInner, cavity_inner_geo);

            //     if(cBD.hasUSBPort && layerDef.portCut) {
            // if layer_def.has_port_cut {
            //     let port_fillets = vec![0f32;port_outline.points.len()];
            //     let interior_fillets = vec![bezel_corner_fillet;cavity_inner_geo.points.len()];
            //     let intersection_fillet = 1f32;
            //     let combination =

            //         let interiorShape = coremath.offsetOutlinePoints(lRD.outline,-bezelThickness);
            //         let interiorFillets = (new Array(interiorShape.length)).fill(tuning.bezelCornerFillet);
            //         let intersectionFillet = 1.0;
            //         let combined = coremath.combineOutlines(interiorShape,interiorFillets, portOutline, portFillets, intersectionFillet);
            //         let combo = combined.outline;
            //         let comboFillets = combined.fillets;
            //         combo.reverse();
            //         comboFillets.reverse();
            //         let outlineFillets = (new Array(lRD.outline.length)).fill(caseCornerFillet);
            //         let exteriorShape = coremath.offsetOutlinePoints(lRD.outline,0.0);

            //         combined = coremath.combineOutlines(exteriorShape,outlineFillets,combo,comboFillets, intersectionFillet, true);
            //         combo = combined.outline;
            //         let finFillets = combined.fillets;

            //         vectorGeo["caseFrame"] = coremath.offsetAndFilletOutline(combo, 0, finFillets, false);
            //         tesselatedGeo["caseFrame"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrame"],8);
            // } else {
            let case_corner_fillet = 3f32; //boardData.layerGetValue(cBD, layerName, "caseCornerFillet");
            let case_frame_geo = fixed_outline.offset_and_fillet(
                0f32,
                &vec![case_corner_fillet; fixed_outline.points.len()],
                false,
            );
            vector_geos.insert(LayerShapes::CaseFrame, case_frame_geo);
            // }

            //     vectorGeo["pcbOutline"] = coremath.offsetAndFilletOutline(globals.pcbData[caseIdx].outline, 0.0, 2.0, false);
            //     tesselatedGeo["pcbOutline"] = coremath.genPointsFromVectorPath(vectorGeo["pcbOutline"]);

            // if(vectorGeo[layer_def.shape]) {
            layer_output.boundary_shape = vector_geos[&layer_def.base_shape].to_outline(8);
            // }

            //     if( tuning[layerDef.visFilter] ) {
            //         if(layerDef.customShape) {
            //             layerDef.customShape(layerName, layerDef, cRD, cBD, bd);
            //         }
            //         else {
            //             if(layerDef.holes.includes("screwHoles")) {
            //                 let screwData = [];
            //                 for(const screw of cBD.screws) {
            //                     screwData.push(new coremath.Circle(screw.location,getScrewRadius(screw, layerName)));
            //                 }

            //                 vectorGeo["screwHoles"] = screwData;
            //                 tesselatedGeo["screwHoles"] = vectorGeo["screwHoles"].map((a) => coremath.genArrayForCircle(a,0,19));
            //             }

            //             const polyShape = tesselatedGeo[layerDef.shape];
            //             let polyHoles = [];
            //             for(const holeLayer of layerDef.holes) {
            //                 if(vectorGeo[holeLayer] != null) {
            //                     lRD.outlines = lRD.outlines.concat(vectorGeo[holeLayer]);
            //                 }
            //                 if(tesselatedGeo[holeLayer] != null) {
            //                     polyHoles = polyHoles.concat(tesselatedGeo[holeLayer]);
            //                 }
            //             }
            //             // console.log("adding layer "+layerName);
            //             const mesh = MeshBuilder.CreatePolygon(layerName, { shape: polyShape, depth:layerDef.height, /*bevel:0.15,*/ smoothingThreshold: 0.1, holes:polyHoles }, scene);
            //             mesh.parent = root;
            //             mesh.position.y = lastLayerOffset[layerName]||layerDef.offset;
            //             mesh.material = mats[boardData.layerGetValue(cBD,layerName,"material")];
            //             gfx.addShadows(mesh);
            //             lRD.meshes.push(mesh);
            //             lRD.outlineBounds = coremath.getVectorPathBounds(vectorGeo[layerDef.shape]);
            //         }
            //     }
            case_output
                .layers
                .insert(layer_def.name.clone(), layer_output);
        }

        JsValue::from_serde(&case_output).unwrap()
    }
}

#[derive(Default, Debug, Serialize)]
struct PathPair {
    vector: Vec<VectorPath>,
    points: Vec<PointPath>,
}

impl PathPair {
    pub fn new() -> PathPair {
        PathPair {
            vector: Vec::new(),
            points: Vec::new(),
        }
    }
}

#[derive(Default, Debug, Serialize)]
struct LayerOutput {
    pub name: String,
    pub boundary_shape: Outline,
    pub outlines: Vec<Outline>,
}

impl LayerOutput {
    pub fn new(name: String) -> LayerOutput {
        LayerOutput {
            name: name,
            boundary_shape: Outline::new(),
            outlines: Vec::new(),
        }
    }
}

#[derive(Default, Debug, Serialize)]
struct CaseOutput {
    bezel_keygroup_cuts: PathPair,
    plate_cuts: PathPair,
    layers: HashMap<String, LayerOutput>,
}

impl CaseOutput {
    pub fn new() -> CaseOutput {
        CaseOutput {
            bezel_keygroup_cuts: PathPair::new(),
            plate_cuts: PathPair::new(),
            layers: HashMap::new(),
        }
    }
}

// not bindgen
impl CaseGeometry {
    pub fn find_overlapping_groups(&self, group_name: &str) -> Vec<Vec<Poly>> {
        let mut group_id: i32 = 0;
        let mut geos: Vec<(Poly, i32)> = Vec::new();

        for key in &self.keys {
            // log!("key: {:?}", key);
            for g in key.get_geo(group_name).drain(..) {
                geos.push((g, -1))
            }
        }

        // log!("ROCKING IT, keys: {:?}, geos: {:?}", self.keys, geos);

        for i in 0..geos.len() {
            for j in (i + 1)..geos.len() {
                let poly = &geos[i].0;
                let other_poly = &geos[j].0;
                let id_i = geos[i].1;
                let id_j = geos[j].1;
                if Poly::overlaps(poly, other_poly) {
                    if id_i == -1 && id_j == -1 {
                        geos[i].1 = group_id;
                        geos[j].1 = group_id;
                        group_id += 1;
                    } else if id_i == -1 && id_j != -1 {
                        geos[i].1 = id_j;
                    } else if id_i != -1 && id_j == -1 {
                        geos[j].1 = id_i;
                    } else {
                        for k in 0..geos.len() {
                            if geos[k].1 == id_j {
                                geos[k].1 = id_i;
                            }
                        }
                    }
                }
            }

            if geos[i].1 == -1 {
                geos[i].1 = group_id;
                group_id += 1;
            }
        }

        if group_id == 0 {
            group_id += 1;
        };

        let mut groups = vec![Vec::new(); group_id as usize];
        for geo in geos.drain(..) {
            groups[if geo.1 != -1 { geo.1 as usize } else { 0 }].push(geo.0);
        }

        groups.retain(|g| g.len() > 0);

        // log!("Groups {:?}", groups);

        groups
    }

    pub fn get_outline_of_poly_group(group: Vec<Poly>, _ignore_overlapping: bool) -> Outline {
        let mut hole_lines: HashMap<u32, RefCell<Vec<Ray>>> = HashMap::new();

        for hole in &group {
            let mut starting_lines = Vec::new();
            for i_p in 0..hole.points.len() {
                let p_seg = Ray::new_from_points(
                    hole.points[i_p],
                    hole.points[(i_p + 1) % hole.points.len()],
                );
                starting_lines.push(p_seg);
            }
            hole_lines.insert(hole.id, RefCell::new(starting_lines));
        }

        let max_overlap_sq = EPSILON;

        let overlap_func = |_prime_l: usize,
                            prime_len: f32,
                            other_len: f32,
                            line: &Ray,
                            normalized_line: &Vector3<f32>,
                            dist_between: f32,
                            new_lines: &mut Vec<Ray>|
         -> bool {
            let prime_to_other_near = (dist_between - other_len).max(0f32) / prime_len;
            let prime_to_other_far = dist_between / prime_len;

            if prime_to_other_near < 1f32 - EPSILON && prime_to_other_far > EPSILON {
                if prime_to_other_near > EPSILON {
                    new_lines.push(Ray {
                        p: line.p,
                        d: normalized_line * (dist_between - other_len),
                    });
                }
                if prime_to_other_far < 1f32 - EPSILON {
                    new_lines.push(Ray {
                        p: line.p,
                        d: normalized_line * dist_between,
                    });
                }
                return true;
            }
            return false;
        };

        for hole in &group {
            let comparison_polys = &group; // if ignore_overlapping { group } else { hole.overlapping_polys };

            for other_hole in comparison_polys {
                if hole.id == other_hole.id {
                    continue;
                }
                let h0_lines_ref = hole_lines.get(&hole.id).unwrap();
                let mut h0_lines_new = Vec::new();
                {
                    // scope for h0_lines replacement
                    let h0_lines = h0_lines_ref.borrow();

                    for i0 in 0..h0_lines.len() {
                        let l0_line = &h0_lines[i0];
                        let l0_p0 = l0_line.p;
                        let l0_dir = l0_line.d;
                        let l0_p1 = l0_p0 + l0_dir;
                        let l0_len = l0_dir.magnitude();
                        let l0_norm = l0_dir / l0_len;
                        let mut suppress_add = false;

                        let h1_lines_ref = hole_lines.get(&other_hole.id).unwrap();
                        let mut h1_lines_new = Vec::new();
                        let mut replace_h1_lines = false;
                        {
                            //scope for h1_lines replacement
                            let h1_lines = h1_lines_ref.borrow();

                            for i1 in 0..h1_lines.len() {
                                let l1_line = &h1_lines[i1];
                                let l1_p0 = l1_line.p;
                                let l1_dir = l1_line.d;
                                let l1_p1 = l1_p0 + l1_dir;
                                let l1_len = l1_dir.magnitude();
                                let l1_norm = l1_dir / l1_len;
                                let l01_dot = l0_norm.dot(&l1_norm);

                                if l01_dot.abs() > 1f32 - EPSILON {
                                    // the lines are parallel
                                    let diff = l0_p0 - l1_p0;

                                    if diff.magnitude_squared() < EPSILON && l01_dot > 0f32 {
                                        // same(ish) start point
                                        if l1_len < l0_len - EPSILON {
                                            // move l0's start point to the end of l1 and break from this poly
                                            // log!("cutting line {:?}", l0_line);
                                            h0_lines_new.push(Ray::new_from_points(l1_p1, l0_p1));
                                        } else {
                                            // log!("skipping line {:?} because of {:?}", l0_line, l1_line);
                                        }
                                        // otherwise, l1 has the same or further end point than l0
                                        // thus l0 is fully covered by l1
                                        //remove iL from the list
                                        suppress_add = true;
                                        break;
                                    }
                                    // if they don't have the same start point, split the lines based on overlap
                                    let dd = diff.dot(&l1_norm);
                                    // if projected_point isn't about the same as l0_p0, then the points aren't colinear (they're just parallel)
                                    let projected_point = l1_p0 + l1_norm.scale(dd);
                                    if na::distance_squared(&projected_point, &l0_p0)
                                        < max_overlap_sq
                                    {
                                        // log!("complex cut {:?}: dd: {:?} | l01_dot: {:?} | l0_len {:?}", l0_line, dd, l01_dot, l0_len);
                                        // check to see if these two are facing away or towards from each other
                                        if l01_dot < 0f32 {
                                            // facing at each other
                                            // at this point, dd is the distance between the two starting points (which are facing each other)
                                            // erase the overlapping portion of each line
                                            // O ------------> olen
                                            //      llen <--------- L
                                            // O <----------------> dd
                                            // unfortunately i need to remove BOTH lines in this situation.  todo:  that.
                                            if overlap_func(
                                                i0,
                                                l0_len,
                                                l1_len,
                                                l0_line,
                                                &l0_norm,
                                                dd,
                                                &mut h0_lines_new,
                                            ) {
                                                // log!("overlap 1 hit");
                                                suppress_add = true;
                                                let mut h1_lines_split = Vec::new();
                                                if overlap_func(
                                                    i1,
                                                    l1_len,
                                                    l0_len,
                                                    l1_line,
                                                    &l1_norm,
                                                    dd,
                                                    &mut h1_lines_split,
                                                ) {
                                                    // log!("overlap 2 hit");
                                                    replace_h1_lines = true;
                                                    for i1_copy in 0..h1_lines.len() {
                                                        if i1 != i1_copy {
                                                            h1_lines_new.push(h1_lines[i1_copy]);
                                                        } else {
                                                            h1_lines_new.append(&mut h1_lines_split)
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        } else if l01_dot > 0f32 {
                                            if dd > EPSILON {
                                                // O -------->
                                                //        L ---------->
                                                // O <---> dd
                                                // consume L
                                                let overlap_dist = l1_len - dd;
                                                if overlap_dist > EPSILON {
                                                    if (l0_len - overlap_dist) > EPSILON {
                                                        h0_lines_new.push(Ray::new_from_points(
                                                            l1_p1, l0_p1,
                                                        ));
                                                    }
                                                    suppress_add = true;
                                                    break;
                                                }
                                            } else {
                                                // dd is <= 0.0
                                                // L -------->
                                                //        O ---------->
                                                // L <---> -dd
                                                // consume L
                                                let d = -dd;
                                                if d < l0_len - EPSILON {
                                                    if d > EPSILON {
                                                        h0_lines_new.push(Ray::new_from_points(
                                                            l0_p0, l1_p0,
                                                        ));
                                                    }
                                                    suppress_add = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if replace_h1_lines {
                            h1_lines_ref.replace(h1_lines_new);
                        }
                        if !suppress_add {
                            let l0_line_clone = (*l0_line).clone();
                            // log!("passing through line {:?}", l0_line_clone);
                            h0_lines_new.push(l0_line_clone);
                        }
                        // don't do anything here so we go to the next line after that
                    }
                }
                // log!("new hole lines: {:?}", h0_lines_new);
                h0_lines_ref.replace(h0_lines_new);
            }
        }

        // log!("hole (pt 2): {:?}", hole_lines);
        for hole in &group {
            let comparison_polys = &group; // if ignore_overlapping { group } else { hole.overlapping_polys };

            for other_hole in comparison_polys {
                if hole.id == other_hole.id {
                    continue;
                }
                let h0_lines_ref = hole_lines.get(&hole.id).unwrap();
                let mut h0_lines_new = Vec::new();
                {
                    // scope for h0_lines replacement
                    let h0_lines = h0_lines_ref.borrow();
                    // log!("poly {:?}", other_hole);

                    for i0 in 0..h0_lines.len() {
                        let l0_line = &h0_lines[i0];
                        let l0_p0 = l0_line.p;
                        let l0_p1 = l0_p0 + l0_line.d;

                        let poly_intersection = l0_line.intersect_poly(&other_hole, false);
                        let start_in_poly = other_hole.contains_point(l0_p0);
                        let end_in_poly = other_hole.contains_point(l0_p1);
                        // log!("poly check {:?} (start in poly: {:?}, end: {:?})", l0_line, start_in_poly, end_in_poly);

                        if poly_intersection.0 < 1 {
                            if start_in_poly == PointInPolyResult::Inside
                                || end_in_poly == PointInPolyResult::Inside
                            {
                                // log!("skipping: 0 intersections, point in poly");
                            } else {
                                // log!("no intersection, copy");
                                h0_lines_new.push(*l0_line);
                            }
                        } else if poly_intersection.0 == 1 {
                            let intersection_point = poly_intersection.1.unwrap();
                            if start_in_poly == PointInPolyResult::Inside {
                                // log!("replacing start with {:?}", intersection_point);
                                if na::distance_squared(&intersection_point, &l0_p1) > EPSILON {
                                    h0_lines_new
                                        .push(Ray::new_from_points(intersection_point, l0_p1));
                                }
                                // else { log!("skipping too close"); }
                            } else {
                                // log!("replacing end with {:?}", intersection_point);
                                if na::distance_squared(&l0_p0, &intersection_point) > EPSILON {
                                    h0_lines_new
                                        .push(Ray::new_from_points(l0_p0, intersection_point));
                                }
                                // else { log!("skipping too close"); }
                            }
                        } else {
                            let intersection_point_1 = poly_intersection.1.unwrap();
                            let intersection_point_2 = poly_intersection.2.unwrap();
                            // log!("multiple intersections {:?} {:?}", intersection_point_1, intersection_point_2);
                            if na::distance_squared(&l0_p0, &intersection_point_1) > EPSILON {
                                h0_lines_new
                                    .push(Ray::new_from_points(l0_p0, intersection_point_1));
                            }
                            if na::distance_squared(&intersection_point_2, &l0_p1) > EPSILON {
                                h0_lines_new
                                    .push(Ray::new_from_points(intersection_point_2, l0_p1));
                            }
                        }
                    }
                }
                // log!("new hole lines: {:?}", h0_lines_new);
                h0_lines_ref.replace(h0_lines_new);
            }
        }

        // time to reconstruct the lines into the outline
        // find a point guaranteed to be on the hull
        // while we're at it, lets also collect all the values into a flat list of rays
        let mut final_lines: Vec<(Point3<f32>, Point3<f32>)> = Vec::new();
        let mut start_line_idx = 0;

        for h_lines_ref in hole_lines.values() {
            let h_lines = &*(h_lines_ref.borrow());

            for h_ray in h_lines {
                final_lines.push((h_ray.p, h_ray.get_end()));

                if h_ray.p.x < final_lines[start_line_idx].0.x
                    || (h_ray.p.x - final_lines[start_line_idx].0.x < EPSILON
                        && h_ray.p.z < final_lines[start_line_idx].0.z)
                {
                    start_line_idx = final_lines.len() - 1;
                }
            }
        }

        // log!("final lines: {:?}, start idx: {:?}", final_lines, start_line_idx);
        let mut outline = Outline::new();

        outline.points.push(final_lines[start_line_idx].0);
        let mut next_target = final_lines[start_line_idx].1;
        final_lines.swap_remove(start_line_idx);

        while final_lines.len() > 0
            && (next_target - outline.points[0]).magnitude_squared() > EPSILON
        {
            let mut next_point = next_target;
            let mut next_next_target = next_target;
            let mut next_dist = 10000000f32;
            let mut next_idx = 0;
            for (i, line) in final_lines.iter().enumerate() {
                if na::distance_squared(&line.0, &next_target) < next_dist {
                    next_idx = i;
                    next_point = line.0;
                    next_next_target = line.1;
                    next_dist = na::distance_squared(&line.0, &next_target);
                }
                if na::distance_squared(&line.1, &next_target) < next_dist {
                    next_idx = i;
                    // flip it here (go from 1 -> 0)
                    next_point = line.1;
                    next_next_target = line.0;
                    next_dist = na::distance_squared(&line.1, &next_target);
                }
            }

            // ok push target on the stack
            outline.points.push(next_target);
            // push the next point if it's not close to the target
            if na::distance_squared(&next_point, &next_target) > EPSILON {
                outline.points.push(next_point);
            }

            next_target = next_next_target;
            final_lines.swap_remove(next_idx);
        }

        // log!("outline log: {:?}", outline);
        // log!(outline);

        return outline;
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct BoardGeometry {
    cases: HashMap<u32, CaseGeometry>,
}

#[wasm_bindgen]
impl BoardGeometry {
    pub fn new() -> BoardGeometry {
        BoardGeometry {
            cases: HashMap::new(),
        }
    }

    pub fn add_key(
        &mut self,
        case_id: u32,
        id: u32,
        key_type: &str,
        x: f32,
        y: f32,
        w: f32,
        h: f32,
        rot_angle: f32,
    ) {
        let case = match self.cases.get_mut(&case_id) {
            Some(case) => case,
            _ => {
                self.cases.insert(case_id, CaseGeometry::new());
                self.cases.get_mut(&case_id).unwrap()
            }
        };
        case.add_key(id, key_type, x, y, w, h, rot_angle);
    }
}

impl KeyData {
    pub fn get_xform(&self) -> Matrix4<f32> {
        let mut key_xform = Matrix4::new_translation(&self.position);
        if self.rotation_rads != 0.0 {
            key_xform =
                key_xform * Matrix4::from_scaled_axis(Vector3::new(0.0, self.rotation_rads, 0.0));
        }
        key_xform
    }

    pub fn get_geo(&self, geo_name: &str) -> Vec<Poly> {
        match geo_name {
            "bezel_holes" => self.get_bezel_cuts(),
            "plate_cuts" => self.get_plate_cuts(),
            _ => Vec::new(),
        }
    }

    pub fn get_bezel_cuts(&self) -> Vec<Poly> {
        let xform = self.get_xform();
        match self.device_type {
            DeviceType::EC11 => {
                vec![Poly::new_rect_poly(
                    (KEY_DIM[0] + BASE_1U[0] * (self.size.x - 1f32)) / 2f32 + BEZEL_GAP,
                    (KEY_DIM[1] + BASE_1U[1] * (self.size.z - 1f32)) / 2f32 + BEZEL_GAP,
                    xform,
                )]
            }
            DeviceType::OLED => {
                vec![Poly::new_rect_poly(
                    (38.1f32 + 1.05f32) / 2f32 + BEZEL_GAP,
                    (14.1f32 + 1.05f32) / 2f32 + BEZEL_GAP,
                    xform,
                )]
            }
            DeviceType::Key => {
                vec![Poly::new_rect_poly(
                    (KEY_DIM[0] + BASE_1U[0] * (self.size.x - 1f32)) / 2f32 + BEZEL_GAP,
                    (KEY_DIM[1] + BASE_1U[1] * (self.size.z - 1f32)) / 2f32 + BEZEL_GAP,
                    xform,
                )]
            }
        }
    }

    fn get_plate_cuts(&self) -> Vec<Poly> {
        let switch_cut_dims: [f32; 2] = [SWITCH_CUT[0] * 0.5, SWITCH_CUT[1] * 0.5];
        let stab_cut_dims: [f32; 2] = [7f32 * 0.5f32, 15f32 * 0.5f32];
        let key_xform = self.get_xform();
        let mut switch_xform = key_xform;

        let mut cuts: Vec<Poly> = Vec::new();

        // wack ass cherry 6u spacebar
        // if(k.size.x == 6.0) {
        //     getPlateCutsWithStabs(id,666,height,Matrix.Translation(9.525, 0, 0).multiply(switch_xform),flipStab,plateCuts,caseIdx);
        // }

        if self.size.x < 665.0f32 {
            cuts.push(Poly::new_rect_poly(
                switch_cut_dims[0],
                switch_cut_dims[1],
                switch_xform,
            ));

            // pcbOps.addDevice(id, "mx_hotswap", switch_xform, caseIdx);
        }

        let mut span = self.size.x;
        // rotate 90 degrees if it's a tall key (iso enter, rotated 2us)
        if self.size.z >= 1.75f32 {
            span = self.size.z;

            switch_xform =
                Matrix4::from_scaled_axis(Vector3::new(0f32, std::f32::consts::PI / 2f32, 0f32))
                    * switch_xform;
        }

        // rotate 180 if the stab is flipped
        if self.flip_stab {
            switch_xform = switch_xform
                * Matrix4::from_scaled_axis(Vector3::new(0f32, std::f32::consts::PI, 0f32));
        }

        if span >= 1.99f32 {
            let mut stab_offsetx_l = 0f32;
            let mut stab_offsetx_r = 0f32;
            if span <= 665f32 {
                if span <= 2.76f32 {
                    stab_offsetx_l = 11.938f32;
                } else if span <= 3.01f32 {
                    stab_offsetx_l = 19.05f32;
                } else if span <= 4.01f32 {
                    stab_offsetx_l = 28.575f32;
                } else if span <= 4.51f32 {
                    stab_offsetx_l = 34.671f32;
                } else if span <= 5.51f32 {
                    stab_offsetx_l = 42.8625f32;
                } else if span <= 6.01f32 {
                    stab_offsetx_l = 47.5f32;
                } else if span <= 6.26f32 {
                    stab_offsetx_l = 50f32;
                } else if span <= 6.51f32 {
                    stab_offsetx_l = 52.38f32;
                } else if span <= 7.01f32 {
                    stab_offsetx_l = 57.15f32;
                } else if span < 600f32 {
                    stab_offsetx_l = 66.675f32;
                }

                stab_offsetx_r = stab_offsetx_l;
            } else {
                // cherry 6u again
                stab_offsetx_l = 57.15f32;
                stab_offsetx_r = 38.1f32;
            }

            let stab_xforms = [
                Matrix4::new_translation(&Vector3::new(-stab_offsetx_l, 0f32, 2f32)) * switch_xform,
                Matrix4::new_translation(&Vector3::new(stab_offsetx_r, 0f32, 2f32)) * switch_xform,
            ];
            // let stabPCBXforms = [Matrix.Translation(-stabOffsetXL, 0, 0).multiply(switch_xform),
            //                         Matrix.Translation( stabOffsetXR, 0, 0).multiply(switch_xform)];

            for j in 0..2 {
                cuts.push(Poly::new_rect_poly(
                    stab_cut_dims[0],
                    stab_cut_dims[1],
                    stab_xforms[j],
                ));
                // pcbOps.addDevice(id, "stab", stabPCBXforms[j], caseIdx);
            }
        }
        cuts
    }
}

// #[wasm_bindgen]
// #[repr(u8)]
// #[derive(Clone, Copy, Debug, PartialEq, Eq)]
// pub enum Cell {
//     Dead = 0,
//     Alive = 1,
// }
