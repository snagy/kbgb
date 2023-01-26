// use wasm_bindgen::prelude::*;
// #[macro_use]
// extern crate approx; // For the macro relative_eq!
extern crate nalgebra as na;
use na::{Matrix4, Point3, Vector2, Vector3};
extern crate js_sys;
use serde::{Deserialize, Serialize};
use std::sync::atomic::{AtomicUsize, Ordering};

pub const EPSILON: f32 = 0.0001;

// #[wasm_bindgen]
#[derive(Clone, Copy, Default, Debug, PartialEq)]
pub struct Bounds2 {
    pub mins: Vector2<f32>,
    pub maxs: Vector2<f32>,
}

impl Bounds2 {
    // pub fn default() -> Bounds2 {
    //     Bounds2 {
    //         mins: Vector2::new(-100.0,-100.0),
    //         maxs: Vector2::new( 100.0, 100.0)
    //     }
    // }

    pub fn new() -> Bounds2 {
        Bounds2 {
            mins: Vector2::new(10000000f32, 10000000f32),
            maxs: Vector2::new(-10000000f32, -10000000f32),
        }
    }
}

#[derive(Clone, Copy, Debug)]
pub struct Ray {
    pub p: Point3<f32>,
    pub d: Vector3<f32>,
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum RayIntersectResult {
    None,
    Intersection(Point3<f32>),
    Colinear(Option<Point3<f32>>, Option<Point3<f32>>),
}

// we call this a "ray" but the direction vector is the length of a segment
impl Ray {
    pub fn new(p: Point3<f32>, d: Vector3<f32>) -> Ray {
        Ray { p: p, d: d }
    }

    pub fn new_from_points(p0: Point3<f32>, p1: Point3<f32>) -> Ray {
        Ray { p: p0, d: p1 - p0 }
    }

    pub fn get_end(&self) -> Point3<f32> {
        self.p + self.d
    }

    // ASSUMES D IS NORMALIZED
    pub fn nearest_point_on_line(&self, y: Point3<f32>) -> Point3<f32> {
        let dir: Vector3<f32> = y - self.p;
        let dot = dir.dot(&self.d);
        return self.p + (self.d * dot);
    }

    pub fn intersect_line(&self, other: &Ray) -> Option<Point3<f32>> {
        let det = self.d.x * other.d.z - self.d.z * other.d.x;
        if det.abs() < EPSILON {
            return None;
        }
        let prev_c = self.p.x * self.d.z - self.p.z * self.d.x;
        let next_c = other.p.x * other.d.z - other.p.z * other.d.x;
        return Some(Point3::new(
            (self.d.x * next_c - other.d.x * prev_c) / det,
            0.0f32,
            (self.d.z * next_c - other.d.z * prev_c) / det,
        ));
    }

    pub fn intersect_segment(&self, other: &Ray) -> RayIntersectResult {
        let s_min_x = self.p.x.min(self.p.x + self.d.x);
        let s_max_x = self.p.x.max(self.p.x + self.d.x);
        let o_min_x = other.p.x.min(other.p.x + other.d.x);
        let o_max_x = other.p.x.max(other.p.x + other.d.x);
        if s_min_x.max(o_min_x) > s_max_x.min(o_max_x) {
            return RayIntersectResult::None;
        }

        let s_min_z = self.p.z.min(self.p.z + self.d.z);
        let s_max_z = self.p.z.max(self.p.z + self.d.z);
        let o_min_z = other.p.z.min(other.p.z + other.d.z);
        let o_max_z = other.p.z.max(other.p.z + other.d.z);
        if s_min_z.max(o_min_z) > s_max_z.min(o_max_z) {
            return RayIntersectResult::None;
        }

        let line_line = self.intersect_line(other);

        match line_line {
            Some(line_intersection) => {
                let s_to_int = line_intersection - self.p;
                let s_len = self.d.magnitude();
                let s_dot = s_to_int.dot(&(self.d / s_len));
                let o_to_int = line_intersection - other.p;
                let o_len = other.d.magnitude();
                let o_dot = o_to_int.dot(&(other.d / o_len));

                // miss the END of the 2nd line
                if s_dot > -EPSILON
                    && s_dot < s_len + EPSILON
                    && o_dot > -EPSILON
                    && o_dot < o_len - EPSILON
                {
                    return RayIntersectResult::Intersection(line_intersection);
                }
            }
            None => {
                // colinear or parallel
                // return points along self where the overlap starts and ends
                // None values indicate the endpoint is occluded
                let s_to_o = other.p - self.p;
                let s_to_o_len = s_to_o.magnitude();
                let s_len = self.d.magnitude();
                let s_dot = s_to_o.dot(&(self.d / s_len));

                if (s_dot.abs() - s_to_o_len).abs() > EPSILON {
                    // these aren't actually colinear, they're just parallel
                    return RayIntersectResult::None;
                }

                let o_len = other.d.magnitude();
                let o_dot = s_to_o.dot(&(other.d / o_len));

                if s_dot >= 0.0 && o_dot < 0.0 {
                    // s ------>
                    //     <----o
                    let first = match s_dot - o_len {
                        x if x <= 0.0 => None,
                        x if x < s_len => Some(self.p + (self.d / s_len) * x),
                        _ => None,
                    };

                    let second = if s_to_o_len < s_len {
                        Some(other.p)
                    } else {
                        None
                    };

                    return RayIntersectResult::Colinear(first, second);
                } else if s_dot >= 0.0 && o_dot >= 0.0 {
                    // s ------>
                    //      o ------>
                    let first = if s_to_o_len < s_len {
                        Some(other.p)
                    } else {
                        return RayIntersectResult::None;
                    };

                    let second = if (s_to_o_len + o_len) < s_len {
                        Some(other.p + other.d)
                    } else {
                        None
                    };

                    return RayIntersectResult::Colinear(first, second);
                } else if s_dot < 0.0 && o_dot < 0.0 {
                    //        s ------->
                    //   o ------->

                    let first = if s_to_o_len > o_len {
                        return RayIntersectResult::None;
                    } else {
                        None
                    };

                    let second = if s_to_o_len + s_len > o_len {
                        Some(other.p + other.d)
                    } else {
                        None
                    };

                    return RayIntersectResult::Colinear(first, second);
                } else {
                    //         s ---->
                    // <--- o
                    // both are pointing away from each other!
                    return RayIntersectResult::None;
                }
            }
        }
        return RayIntersectResult::None;
    }

    pub fn intersect_poly(
        &self,
        poly: &Poly,
        include_colinear_edge_intersections: bool,
    ) -> (u32, Option<Point3<f32>>, Option<Point3<f32>>) {
        let mut closest_dist_sq: f32 = 100000000.0;
        let mut closest_intersection: Option<Point3<f32>> = None;
        let mut farthest_dist_sq: f32 = -1.0;
        let mut farthest_intersection: Option<Point3<f32>> = None;
        let mut num_intersections: u32 = 0;

        let mut check_int = |intersection: Point3<f32>| {
            let dist_sq = (self.p - intersection).magnitude_squared();

            num_intersections += 1;

            // should we continue here if dist < eps*eps?
            if dist_sq < closest_dist_sq {
                closest_dist_sq = dist_sq;
                closest_intersection = Some(intersection);
            }

            if dist_sq > farthest_dist_sq {
                farthest_dist_sq = dist_sq;
                farthest_intersection = Some(intersection);
            }
        };

        for i in 0..poly.points.len() {
            let p_seg =
                Ray::new_from_points(poly.points[i], poly.points[(i + 1) % poly.points.len()]);
            match self.intersect_segment(&p_seg) {
                RayIntersectResult::Intersection(int_point) => {
                    check_int(int_point);
                }
                RayIntersectResult::Colinear(int_first, int_second) => {
                    if include_colinear_edge_intersections {
                        match int_first {
                            Some(p) => check_int(p),
                            _ => {}
                        };
                        match int_second {
                            Some(p) => check_int(p),
                            _ => {}
                        };
                    } else {
                        return (0, None, None);
                    }
                }
                _ => {}
            }
        }

        return (
            num_intersections,
            closest_intersection,
            farthest_intersection,
        );
    }
}

// Poly should be convex
#[derive(Clone, Debug, PartialEq)]
pub struct Poly {
    pub points: PointPath,
    pub id: u32,
}

static POLY_COUNTER: AtomicUsize = AtomicUsize::new(0);

#[derive(PartialEq, Debug)]
pub enum PointInPolyResult {
    Inside,
    Outside,
    OnEdge,
}

impl Poly {
    pub fn new(points: PointPath) -> Poly {
        Poly {
            points,
            id: POLY_COUNTER.fetch_add(1, Ordering::SeqCst) as u32,
        }
    }

    pub fn new_rect_poly(w: f32, h: f32, xform: Matrix4<f32>) -> Poly {
        let mut points: PointPath = Vec::new();

        points.push(xform.transform_point(&Point3::new(-w, 0.0, -h)));
        points.push(xform.transform_point(&Point3::new(w, 0.0, -h)));
        points.push(xform.transform_point(&Point3::new(w, 0.0, h)));
        points.push(xform.transform_point(&Point3::new(-w, 0.0, h)));

        Poly::new(points)
    }

    fn check_intersection(&self, poly: &Poly) -> bool {
        let mut norm = Vector3::new(0.0, 0.0, 0.0);

        for i in 0..self.points.len() {
            let h0 = self.points[i];
            let h1 = if i + 1 < self.points.len() {
                self.points[i + 1]
            } else {
                self.points[0]
            };

            norm.x = h1.z - h0.z;
            norm.z = h0.x - h1.x;

            let mut all_more = true;

            for p in &poly.points {
                // let dot = (p - h0).dot(&norm);

                let dot = norm.x * (p.x - h0.x) + norm.z * (p.z - h0.z);

                all_more &= dot > EPSILON;
            }

            if all_more {
                return false;
            }
        }
        true
    }

    pub fn contains_point(&self, point: Point3<f32>) -> PointInPolyResult {
        let mut norm = Vector3::new(0.0, 0.0, 0.0);
        for i in 0..self.points.len() {
            let h0 = self.points[i];
            let h1 = if i + 1 < self.points.len() {
                self.points[i + 1]
            } else {
                self.points[0]
            };

            norm.x = h1.z - h0.z;
            norm.z = h0.x - h1.x;

            let dot = norm.x * (point.x - h0.x) + norm.z * (point.z - h0.z);
            if dot > EPSILON {
                return PointInPolyResult::Outside;
            } else if dot > -EPSILON {
                return PointInPolyResult::OnEdge;
            }
        }
        PointInPolyResult::Inside
    }

    pub fn overlaps(poly_a: &Poly, poly_b: &Poly) -> bool {
        poly_a.check_intersection(poly_b) && poly_b.check_intersection(&poly_a)
    }

    pub fn to_outline(&self) -> Outline {
        let mut new_outline = Outline::new();
        new_outline.points = self.points.clone();
        return new_outline;
    }
}

pub type PointPath = Vec<Point3<f32>>;

#[derive(Copy, Clone, Debug, PartialEq, Serialize, Deserialize)]
pub enum VectorPathPrim {
    Point(Point3<f32>),              // point
    Arc(Point3<f32>, f32, f32, f32), //center, radius, rotRadians, endRot
    Circle(Point3<f32>, f32),        // center, radius
}

// Outline is a potentially concave polygon
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct VectorPath {
    pub prims: Vec<VectorPathPrim>,
}

impl VectorPath {
    pub fn new() -> VectorPath {
        VectorPath { prims: Vec::new() }
    }

    fn gen_array_for_circle(
        center: Point3<f32>,
        radius: f32,
        offset: f32,
        num_segments: i32,
    ) -> PointPath {
        let mut output_points = Vec::new();

        let rot_step = std::f32::consts::PI * 2f32 / num_segments as f32;
        for i in 0..num_segments {
            output_points
                .push(center + get_normal_from_rot(rot_step * i as f32).scale(radius + offset));
        }

        return output_points;
    }

    pub fn gen_points(&self, segments_per_fillet: i32) -> PointPath {
        let mut output_points = Vec::new();

        for prim in &self.prims {
            match prim {
                VectorPathPrim::Point(position) => {
                    output_points.push(*position);
                }
                VectorPathPrim::Arc(center, radius, rot_radians, end_rotation) => {
                    let rot_step = rot_radians / segments_per_fillet as f32;
                    for i in (0..(segments_per_fillet)).rev() {
                        output_points.push(
                            *center
                                + get_normal_from_rot(end_rotation - rot_step * i as f32)
                                    .scale(*radius),
                        );
                    }
                }
                VectorPathPrim::Circle(center, radius) => {
                    output_points.append(&mut VectorPath::gen_array_for_circle(
                        *center,
                        *radius,
                        0.0,
                        segments_per_fillet * 4,
                    ));
                }
            }
        }
        return output_points;
    }

    pub fn to_outline(&self, segments_per_fillet: i32) -> Outline {
        let mut new_outline = Outline::new();
        new_outline.points = self.gen_points(segments_per_fillet);
        return new_outline;
    }
}

pub fn get_rot_from_normal(norm: &Vector3<f32>) -> f32 {
    if norm.z < 0f32 {
        2f32 * std::f32::consts::PI - norm.x.acos()
    } else {
        norm.x.acos()
    }
}

pub fn get_normal_from_rot(rot: f32) -> Vector3<f32> {
    Vector3::new(rot.cos(), 0f32, rot.sin())
}

// Outline is a potentially concave polygon
#[derive(Default, Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Outline {
    pub points: PointPath,
}

impl Outline {
    pub fn new() -> Outline {
        Outline { points: Vec::new() }
    }

    pub fn offset_point(offset: f32, point: &Point3<f32>, prev_point: &Point3<f32>, next_point: &Point3<f32>) -> Option<Point3<f32>> {
        let next_dir = (next_point - point).normalize();
        let prev_dir = (point - prev_point).normalize();
        let half_vector = (next_dir+prev_dir).scale(0.5).normalize();

        let offset_dir = Vector3::new(half_vector.z, half_vector.y, -half_vector.x);

        let cos = prev_dir.dot(&half_vector);
        // so the math actually works fine for cos == 1 but some old code expected it to return none so lets keep doing that.
        if cos < EPSILON || cos > 1f32-EPSILON {
            return None;
        }

        let scale = offset / cos;
        let offset_point = point + offset_dir.scale(scale);

        return Some(offset_point);
    }

    pub fn gen_offset_outline(&self, offset: f32) -> Outline {
        let mut new_outline = Outline::new();
        for i in 0..self.points.len() {
            let point = self.points[i];
            let next = self.points[if i + 1 < self.points.len() { i + 1 } else { 0 }];

            let prev = self.points[if i > 0 { i - 1 } else { self.points.len() - 1 }];

            match Outline::offset_point(offset, &point, &prev, &next) {
                Some(intersection) => {
                    new_outline.points.push(intersection);
                }
                None => {
                    // this is ok because we assume colinear will offset the same on both ends
                }
            }
        }
        return new_outline;
    }
    

    pub fn gen_cut_rays(&self) -> Vec<Ray> {
        let mut rays = Vec::new();

        for i in 0..self.points.len() {
            let i_end = if i+1 < self.points.len() {i+1} else {0};
            let full_ray = Ray::new_from_points(self.points[i], self.points[i_end]);
            let mut cut_points = Vec::new();

            for j in 0..self.points.len() {
                let j_end = if j+1 < self.points.len() {j+1} else {0};

                if j == i_end || i == j_end {continue}

                let other_ray = Ray::new_from_points(self.points[j], self.points[j_end]);

                match full_ray.intersect_segment(&other_ray) {
                    RayIntersectResult::Intersection(int_point) => {
                        cut_points.push(int_point);
                    },
                    RayIntersectResult::Colinear(p0, p1) => {
                        match p0 {
                            Some(p) => {
                                cut_points.push(p)
                            },
                            _ => {}
                        }
                        match p1 {
                            Some(p) => {
                                cut_points.push(p)
                            },
                            _ => {}
                        }
                    },
                    _ => {}
                }
            }

            if cut_points.len() < 1 {
                rays.push(full_ray);
            } else {
                cut_points.push(full_ray.get_end());
                // cut_points.sort_by_cached_key(|a| { (a-full_ray.p).magnitude_squared() });
                cut_points.sort_by(|a, b| {
                    (a-full_ray.p).magnitude_squared().partial_cmp(&(b-full_ray.p).magnitude_squared()).unwrap()
                });
                let mut last_point = full_ray.p;

                for p in 0..cut_points.len() {
                    let new_point = cut_points[p];
                    if (new_point - last_point).magnitude_squared() > EPSILON {
                        rays.push(Ray::new_from_points(last_point, new_point));
                        last_point = new_point;
                    }
                }
            }
        }

        rays
    }

    // DOES NOT CUT RAYS.  simply finds the next one until it has an outline.
    pub fn new_from_rays(rays: Vec<Ray>) -> Outline {
        let mut new_outline = Outline::new();

        let mut ray_visited = vec![false; rays.len()];
        let mut ray_idx = 0;

        for i in 0..rays.len() {
            let point = rays[i].p;
            let best_point = rays[ray_idx].p;
            if point.x < best_point.x || (point.x == best_point.x && point.y < best_point.y) {
                ray_idx = i;
            }
        }
        ray_visited[ray_idx] = true;
        new_outline.points.push(rays[ray_idx].p);

        let mut next_end = rays[ray_idx].get_end();

        while (new_outline.points[0] - next_end).magnitude_squared() > EPSILON {
            new_outline.points.push(next_end);

            let mut best_idxs = Vec::new();
            let mut best_dist = 1000000000.0f32;

            for i in 0..rays.len() {
                if ray_visited[i] { continue; }

                let dist = (rays[i].p - next_end).magnitude_squared();

                // TODO: this needs to radially sort the options < epsilon away and pick the first one
                if dist < best_dist-EPSILON {
                    best_idxs = vec![i];
                    best_dist = dist;
                } else if dist < best_dist+EPSILON {
                    best_idxs.push(i);
                }
            }
            
            if best_idxs.len() == 0 {
                break;
            }

            if best_idxs.len() > 1 {
                let p = next_end;
                let prev_point = new_outline.points[new_outline.points.len()-2];

                let p_to_prev: Vector3<f32> = (p - prev_point).normalize();
    
                let prev_angle = get_rot_from_normal(&p_to_prev);
                let comp_val = std::f32::consts::PI * 2f32 - prev_angle + EPSILON;
    
                best_idxs.sort_by(|a, b| {
                    let p_a = rays[*a].get_end();
                    let p_b = rays[*b].get_end();
                    let p_to_a = (get_rot_from_normal(&(p - p_a).normalize())
                        + comp_val)
                        % (std::f32::consts::PI * 2f32);
                    let p_to_b = (get_rot_from_normal(&(p - p_b).normalize())
                        + comp_val)
                        % (std::f32::consts::PI * 2f32);
                    return p_to_a.partial_cmp(&p_to_b).unwrap();
                });
            }

            // best_idxs.sort_by(|a, b| {b.cmp(a)});

            let next_idx = best_idxs[0];
            ray_visited[next_idx] = true;
            next_end = rays[next_idx].get_end();
        }

        return new_outline;
    }

    pub fn gen_fixed_outline(&self) -> Outline {
        return Outline::new_from_rays(self.gen_cut_rays());
    }

    fn get_fillet_points(
        input_fillet: f32,
        prev: Point3<f32>,
        point: Point3<f32>,
        next: Point3<f32>,
        offset_prev_line: f32,
        offset_next_line: f32,
    ) -> Option<(Point3<f32>, Point3<f32>, Point3<f32>)> {
        let point_to_next_len_sq= (next - point).magnitude_squared();
        let prev_to_point_len_sq= (point - prev).magnitude_squared();
        if point_to_next_len_sq < EPSILON || prev_to_point_len_sq < EPSILON {
            return None;
        }
        
        let next_dir = (next - point).normalize();
        let prev_dir = (point - prev).normalize();
        let next_norm = Vector3::new(-next_dir.z, 0f32, next_dir.x);
        let prev_norm = Vector3::new(-prev_dir.z, 0f32, prev_dir.x);

        if next_dir.dot(&prev_dir).abs() < 1f32 - EPSILON {
            let flip = prev_norm.dot(&next_dir) > 0f32;
            let fillet = if flip { -input_fillet } else { input_fillet };
            let offset0 = if flip {
                -offset_prev_line
            } else {
                offset_prev_line
            };
            let offset1 = if flip {
                -offset_next_line
            } else {
                offset_next_line
            };

            match Ray::new(point + prev_norm.scale(offset0 - fillet), prev_dir).intersect_line(
                &Ray::new(point + next_norm.scale(offset1 - fillet), next_dir),
            ) {
                Some(fillet_center) => {
                    return Some(
                        (
                            fillet_center,                                //center
                            fillet_center + prev_norm.scale(fillet), //entry
                            fillet_center + next_norm.scale(fillet), //exit
                        ),
                    );
                }
                None => {
                    log!("intersect failed!");
                }
            }
        }
        log!("fillet dot is {}", next_dir.dot(&prev_dir).abs());
        return None;
    }

    fn get_fillet_arc(
        entry_norm: &Vector3<f32>,
        exit_norm: &Vector3<f32>,
        flip: bool,
    ) -> (f32, f32) {
        let mut start_rot = get_rot_from_normal(&entry_norm) + std::f32::consts::PI * 2f32;
        let mut end_rot = get_rot_from_normal(&exit_norm) + std::f32::consts::PI * 2f32;
        if flip {
            start_rot += std::f32::consts::PI;
            end_rot += std::f32::consts::PI;
            while start_rot < end_rot {
                start_rot += std::f32::consts::PI * 2f32;
            }
        } else {
            while end_rot < start_rot {
                end_rot += std::f32::consts::PI * 2f32;
            }
        }
        let total_rot = end_rot - start_rot;
        return (total_rot, end_rot);
    }

    pub fn fillet(&self, fillets: &Vec<f32>, close: bool) -> VectorPath {
        let mut vector_outline = VectorPath::new();

        if fillets.len() == 0 {
            return self.to_vector_path();
        }

        let mut fillet_infos = Vec::with_capacity(self.points.len());

        for i in 0..self.points.len() {
            let point = self.points[i];
            let fillet = fillets[i];
            let next = if i + 1 < self.points.len() {
                self.points[i + 1]
            } else {
                self.points[0]
            };
            let prev = if i >= 1 {
                self.points[i - 1]
            } else {
                self.points[self.points.len() - 1]
            };

            fillet_infos.push(Outline::get_fillet_points(
                fillet, prev, point, next, 0f32, 0f32,
            ));

            match fillet_infos[fillet_infos.len() - 1] {
                Some(_) => {}
                None => {
                    log!(
                        "no fillet info for {:?} {:?} {:?} {:?}",
                        fillet,
                        prev,
                        point,
                        next
                    );
                }
            }
        }

        let mut last_valid_entry_index = usize::MAX;
        let mut dangling_exit_index = usize::MAX;
        for i in 0..self.points.len() {
            let point = self.points[i];
            match fillet_infos[i] {
                Some(fillet_info) => {
                    let fillet_center = fillet_info.0;
                    let entry_point = fillet_info.1;
                    let exit_point = fillet_info.2;
                    let prev_idx = if i >= 1 { i - 1 } else { self.points.len() - 1 };
                    let next_idx = if i + 1 < self.points.len() { i + 1 } else { 0 };
                    let prev = self.points[prev_idx];
                    let next = self.points[next_idx];
                    let prev_exit = match fillet_infos[prev_idx] {
                        Some(fillet_info) => fillet_info.2,
                        None => prev,
                    };
                    let next_entry = match fillet_infos[next_idx] {
                        Some(fillet_info) => fillet_info.1,
                        None => prev,
                    };

                    let prev_vec = point - prev;
                    let prev_dir = prev_vec.normalize();
                    let next_vec = next - point;
                    let next_dir = next_vec.normalize();

                    // console.log(`first check ${Vector3.Dot(prevExit.subtract(prev),prevDir)} <= ${Vector3.Dot(entryPoint.subtract(prev),prevDir)}`)
                    if (prev_exit - prev).dot(&prev_dir) <= (entry_point - prev).dot(&prev_dir) {
                        if last_valid_entry_index < usize::MAX {
                            log!(
                                "CRAP OVERWRITING INDEX {:?} with {:?}",
                                last_valid_entry_index,
                                i
                            );
                        }
                        last_valid_entry_index = i;
                    } else {
                        log!("entry overlap at i {} last valid is {}", i, last_valid_entry_index);
                        log!("entry: {} this: {}", entry_point, point);
                    }

                    // console.log(`second check ${Vector3.Dot(nextEntry.subtract(point),nextDir)} >= ${Vector3.Dot(exitPoint.subtract(point),nextDir)}`)
                    if (next_entry - point).dot(&next_dir) < (exit_point - point).dot(&next_dir) {
                        if i + 1 >= self.points.len() && dangling_exit_index < usize::MAX {
                            log!("oh boy we're at the end and have a dangling index!");
                        }
                        log!("skipping based on exit overlap at {}", i);
                        log!("this: {} exit: {}", point, exit_point);
                        continue;
                    }

                    if last_valid_entry_index == i {
                        // log!(" last_valid_entry_index == i {}", i);
                        let fillet = fillets[i];
                        let next_norm = Vector3::new(next_dir.z, 0f32, -next_dir.x);
                        let prev_norm = Vector3::new(prev_dir.z, 0f32, -prev_dir.x);

                        let arc_rots = Outline::get_fillet_arc(
                            &prev_norm,
                            &next_norm,
                            prev_norm.dot(&next_dir) > 0f32,
                        );
                        vector_outline
                            .prims
                            .push(VectorPathPrim::Point(entry_point));
                        vector_outline.prims.push(VectorPathPrim::Arc(
                            fillet_center,
                            fillet,
                            arc_rots.0,
                            arc_rots.1,
                        ));
                        last_valid_entry_index = usize::MAX;
                    } else if last_valid_entry_index != usize::MAX {
                        let p_p_idx = if last_valid_entry_index != 0 {
                            last_valid_entry_index - 1
                        } else {
                            self.points.len() - 1
                        };
                        let p_p = self.points[p_p_idx];
                        let p_0 = self.points[last_valid_entry_index];
                        let p_1 = self.points[i];
                        let p_n = self.points[next_idx];

                        let fillet0 = fillets[last_valid_entry_index];
                        let fillet1 = fillets[i];
                        let prev_vec = p_0 - p_p;
                        let prev_dir = prev_vec.normalize();
                        let prev_norm = Vector3::new(prev_dir.z, 0f32, -prev_dir.x);
                        let mid_vec = p_1 - p_0;
                        let mid_dir = mid_vec.normalize();
                        let mid_norm = Vector3::new(mid_dir.z, 0f32, -mid_dir.x);
                        let next_vec = p_n - p_1;
                        let next_dir = next_vec.normalize();
                        let next_norm = Vector3::new(next_dir.z, 0f32, -next_dir.x);

                        let n_dot_p = next_dir.dot(&prev_dir);
                        log!("skip fillets {} to {}!", last_valid_entry_index, i);
                        log!("f0 {} f1 {} prev {} last {} this {} next {}", fillet0, fillet1, p_p, p_0, p_1, p_n);

                        match Outline::get_fillet_points(fillet0, p_p, p_0, p_1, 0f32, 0f32) {
                            Some(mut corners0) => {
                                match Outline::get_fillet_points(fillet1, p_0, p_1, p_n, 0f32, 0f32)
                                {
                                    Some(mut corners1) => {
                                        let c0_len = (corners0.2 - p_0).magnitude();
                                        let c1_len = (corners1.1 - p_0).magnitude();
                                        let flip0 = prev_norm.dot(&mid_dir) > 0f32;
                                        let flip1 = mid_norm.dot(&next_dir) > 0f32;
                                        let mut mid_norm0 = mid_norm;
                                        let mut mid_norm1 = mid_norm;
                                        // log!("fp2.1 corners0 {:?} corners1 {:?}", corners0, corners1);

                                        // if n_dot_p > EPSILON && c1_len < c0_len {
                                        if (corners1.1 - p_0).dot(&mid_dir) <= (corners0.2 - p_0).dot(&mid_dir) {
                                            if n_dot_p > EPSILON {
                                                let adjusted_meeting_point =
                                                    corners1.1 + (corners0.2 - corners1.1).scale(0.5);
                                                let adjusted_amt =
                                                    (corners0.2 - adjusted_meeting_point).magnitude();
                                                let move_line_by = fillet0
                                                    - (fillet0 * fillet0 - adjusted_amt * adjusted_amt)
                                                        .sqrt();
    
                                                // find fillet points AGAIN
                                                corners0 = Outline::get_fillet_points(
                                                    fillet0,
                                                    p_p,
                                                    p_0,
                                                    p_1,
                                                    0f32,
                                                    move_line_by,
                                                )
                                                .unwrap();
                                                corners0.2 = adjusted_meeting_point;
                                                corners1 = Outline::get_fillet_points(
                                                    fillet1,
                                                    p_0,
                                                    p_1,
                                                    p_n,
                                                    move_line_by,
                                                    0f32,
                                                )
                                                .unwrap();
                                                corners1.1 = adjusted_meeting_point;
                                                log!("fp2.2");
    
                                                if flip0 {
                                                    mid_norm0 = (corners0.0 - corners0.2).normalize();
                                                } else {
                                                    mid_norm0 = (corners0.2 - corners0.0).normalize();
                                                }
    
                                                if flip1 {
                                                    mid_norm1 = (corners1.0 - corners1.1).normalize();
                                                } else {
                                                    mid_norm1 = (corners1.1 - corners1.0).normalize();
                                                }
                                            } else {
                                                vector_outline.prims.push(VectorPathPrim::Point(p_0));
                                                vector_outline.prims.push(VectorPathPrim::Point(p_1));
                                                last_valid_entry_index = usize::MAX;
                                                continue;
                                            }
                                        }
                                        let arc_rots =
                                            Outline::get_fillet_arc(&prev_norm, &mid_norm0, flip0);
                                        
                                        vector_outline
                                            .prims
                                            .push(VectorPathPrim::Point(corners0.1));
                                        vector_outline.prims.push(VectorPathPrim::Arc(
                                            corners0.0, fillet0, arc_rots.0, arc_rots.1,
                                        ));

                                        let arc_rots1 =
                                            Outline::get_fillet_arc(&mid_norm1, &next_norm, flip1);
                                            
                                        vector_outline
                                            .prims
                                            .push(VectorPathPrim::Point(corners1.1));
                                        vector_outline.prims.push(VectorPathPrim::Arc(
                                            corners1.0,
                                            fillet1,
                                            arc_rots1.0,
                                            arc_rots1.1,
                                        ));
                                    }
                                    None => {
                                        log!("second fillet failed");
                                        vector_outline.prims.push(VectorPathPrim::Point(p_0));
                                        vector_outline.prims.push(VectorPathPrim::Point(p_1));
                                    }
                                }
                            }
                            None => {
                                log!("first fillet failed");
                                vector_outline.prims.push(VectorPathPrim::Point(p_0));
                                vector_outline.prims.push(VectorPathPrim::Point(p_1));
                            }
                        }

                        last_valid_entry_index = usize::MAX
                    } else {
                        log!("dangler!  gonna have to clean that up");
                        dangling_exit_index = i;
                    }
                }
                None => {
                    log!("no fillet info for {}", i);
                    vector_outline.prims.push(VectorPathPrim::Point(point));
                    continue;
                }
            }
        }

        if close {
            vector_outline.prims.push(vector_outline.prims[0]);
        }

        return vector_outline;
    }

    pub fn to_vector_path(&self) -> VectorPath {
        let mut new_path = VectorPath::new();

        for p in &self.points {
            new_path.prims.push(VectorPathPrim::Point(*p));
        }

        new_path
    }

    pub fn offset_and_fillet(
        &self,
        offset: f32,
        fillets: &Vec<f32>,
        force_close: bool,
    ) -> VectorPath {
        let offset_outline = self.gen_offset_outline(offset);

        if fillets.len() == 0 {
            let vector_path = offset_outline.to_vector_path();
            // log!("{:?}", vector_path);

            return vector_path;
        } else {
            let vector_path = offset_outline.fillet(&fillets, force_close);
            // log!("{:?}", vector_path);

            return vector_path;
        }
    }

    // pub fn combine_with(&self, other: &Outline) -> Outline {

    // }
}
