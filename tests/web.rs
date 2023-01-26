//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate kbgb_wasm;
use kbgb_wasm::core_math::Ray;
use kbgb_wasm::core_math::RayIntersectResult;
use kbgb_wasm::core_math::Outline;
use kbgb_wasm::core_math::EPSILON;

use kbgb_wasm::core_math::Poly;
use kbgb_wasm::CaseGeometry;

extern crate nalgebra as na;
use na::{Matrix4, Point3, Vector3};

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_rays() {
    let r0 = Ray::new_from_points(Point3::new(-1.0, 0.0, 2.0), Point3::new(7.0, 0.0, 2.0));
    let r1 = Ray::new_from_points(Point3::new(3.0, 0.0, -2.0), Point3::new(3.0, 0.0, 7.0));
    let r0_short = Ray::new_from_points(Point3::new(-1.0, 0.0, 2.0), Point3::new(2.0, 0.0, 2.0));
    let r0_short_left =
        Ray::new_from_points(Point3::new(-1.0, 0.0, 2.0), Point3::new(-2.0, 0.0, 2.0));
    let r0_rt = Ray::new_from_points(Point3::new(0.0, 0.0, 2.0), Point3::new(7.0, 0.0, 2.0));
    let r0_lt = Ray::new_from_points(Point3::new(7.0, 0.0, 2.0), Point3::new(0.0, 0.0, 2.0));
    let r_max = Ray::new_from_points(Point3::new(-9.0, 0.0, 2.0), Point3::new(9.0, 0.0, 2.0));

    assert_eq!(r0.intersect_line(&r1), Some(Point3::new(3.0, 0.0, 2.0)));
    assert_eq!(r1.intersect_line(&r0), Some(Point3::new(3.0, 0.0, 2.0)));
    assert_eq!(
        r0.intersect_segment(&r1),
        RayIntersectResult::Intersection(Point3::new(3.0, 0.0, 2.0))
    );
    assert_eq!(
        r1.intersect_segment(&r0),
        RayIntersectResult::Intersection(Point3::new(3.0, 0.0, 2.0))
    );
    assert_eq!(r0_short.intersect_segment(&r1), RayIntersectResult::None);
    assert_eq!(r1.intersect_segment(&r0_short), RayIntersectResult::None);

    assert_eq!(
        r0_short.intersect_segment(&r0_rt),
        RayIntersectResult::Colinear(Some(Point3::new(0.0, 0.0, 2.0)), None)
    );
    assert_eq!(
        r0_rt.intersect_segment(&r0_short),
        RayIntersectResult::Colinear(None, Some(Point3::new(2.0, 0.0, 2.0)))
    );

    assert_eq!(
        r0_rt.intersect_segment(&r0_short_left),
        RayIntersectResult::None
    );
    assert_eq!(
        r0_short_left.intersect_segment(&r0_rt),
        RayIntersectResult::None
    );

    assert_eq!(
        r0_short.intersect_segment(&r_max),
        RayIntersectResult::Colinear(None, None)
    );
    assert_eq!(
        r_max.intersect_segment(&r0_short),
        RayIntersectResult::Colinear(
            Some(Point3::new(-1.0, 0.0, 2.0)),
            Some(Point3::new(2.0, 0.0, 2.0))
        )
    );
}

#[wasm_bindgen_test]
fn test_outline_solo() {
    let key_dim = 10f32;
    let polys = vec![Poly::new_rect_poly(
        key_dim * 0.5f32,
        key_dim * 0.5f32,
        Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
    )];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
        ],
    };
    assert_eq!(outline, target_outline);
}

#[wasm_bindgen_test]
fn test_outline_2_adjacent() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(key_dim, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, -5f32),
            Point3::new(15f32, 0f32, -5f32),
            Point3::new(15f32, 0f32, 5f32),
            Point3::new(5f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
        ],
    };
    assert_eq!(outline, target_outline);
}

#[wasm_bindgen_test]
fn test_outline_2_corner_overlap() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(5f32, 0f32, 5f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, 0f32),
            Point3::new(10f32, 0f32, 0f32),
            Point3::new(10f32, 0f32, 10f32),
            Point3::new(0f32, 0f32, 10f32),
            Point3::new(0f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
        ],
    };
    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_corner_overlap"
    );
}

#[wasm_bindgen_test]
fn test_outline_2_interior_occlusion() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim,
            key_dim,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-10f32, 0f32, -10f32),
            Point3::new(10f32, 0f32, -10f32),
            Point3::new(10f32, 0f32, 10f32),
            Point3::new(-10f32, 0f32, 10f32),
        ],
    };
    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_interior_occlusion"
    );
}

#[wasm_bindgen_test]
fn test_outline_2_interior_overlap() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-10f32, 0f32, -5f32),
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, -5f32),
            Point3::new(10f32, 0f32, -5f32),
            Point3::new(10f32, 0f32, 5f32),
            Point3::new(5f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
            Point3::new(-10f32, 0f32, 5f32),
        ],
    };
    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_interior_overlap"
    );
}

#[wasm_bindgen_test]
fn test_outline_2_share_single_edge_overlap() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(-5f32, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-10f32, 0f32, -5f32),
            Point3::new(0f32, 0f32, -5f32),
            Point3::new(10f32, 0f32, -5f32),
            Point3::new(10f32, 0f32, 5f32),
            Point3::new(0f32, 0f32, 5f32),
            Point3::new(-10f32, 0f32, 5f32),
        ],
    };
    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_adjacent_single_edge_overlap"
    );
}

#[wasm_bindgen_test]
fn test_outline_2_some_overlap() {
    let key_dim = 10.0f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(5f32, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-10f32, 0f32, -5f32),
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(15f32, 0f32, -5f32),
            Point3::new(15f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
            Point3::new(-10f32, 0f32, 5f32),
        ],
    };
    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_adjacent_single_edge_overlap"
    );
}

#[wasm_bindgen_test]
fn test_outline_2_total_overlap() {
    let key_dim = 10f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let target_outline = kbgb_wasm::core_math::Outline {
        points: vec![
            Point3::new(-5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, -5f32),
            Point3::new(5f32, 0f32, 5f32),
            Point3::new(-5f32, 0f32, 5f32),
        ],
    };

    assert_eq!(
        outline, target_outline,
        "Failed test_outline_2_total_overlap"
    );
}

#[wasm_bindgen_test]
fn test_offset_outline_solo() {
    let key_dim = 10f32;
    let polys = vec![Poly::new_rect_poly(
        key_dim * 0.5f32,
        key_dim * 0.5f32,
        Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
    )];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let offset_outline = outline.offset_and_fillet(5f32, &Vec::new(), false);

    let target_outline = kbgb_wasm::core_math::VectorPath {
        prims: vec![
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(-10f32, 0f32, -10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(10f32, 0f32, -10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(10f32, 0f32, 10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(-10f32, 0f32, 10f32)),
        ],
    };

    assert_eq!(offset_outline, target_outline, "test_offset_outline_solo");
}

#[wasm_bindgen_test]
fn test_offsetting() {
    let mut nones = 0;

    let mut match_set = | point, prev, next, target: Point3<f32>, name | {
        match Outline::offset_point(5.0f32, &point, &prev, &next) {
            Some(intersection) => {
                assert!((intersection-target).magnitude() < EPSILON, "test_offsetting {}", name);
            }
            None => {nones+=1;}
        };
    };

    match_set(  Point3::new(0f32,0f32,0f32),   // point
                Point3::new(0f32,0f32,-1f32),  // prev
                Point3::new(-1f32,0f32,0f32),  // next
                Point3::new(5f32,0f32,5f32),  // target 
                "90 deg" );

    match_set(  Point3::new(0f32,0f32,0f32),   // point
                Point3::new(0f32,0f32,-1f32),  // prev
                Point3::new(-1f32,0f32,1f32),  // next
                Point3::new(5f32,0f32,2.0710678f32), // target
                "45 left");



    assert_eq!(nones, 0, "test_offsetting nones");
}

#[wasm_bindgen_test]
fn test_outline_triple_overlapped() {
    let key_dim = 20.10f32;
    let offset = 19.05f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim * 0.5f32 + offset * 0.25f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(52.3875f32, 0f32, -9.525f32)), // 23.8125
                                                                                  // Matrix4::new_translation(&Vector3::new(-(offset*1.25f32), 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(76.2f32, 0f32, -9.525f32)),
            // Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            Matrix4::new_translation(&Vector3::new(76.2f32, 0f32, -28.575f32)),
            // Matrix4::new_translation(&Vector3::new(0f32, 0f32, -offset)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let offset_outline = outline.offset_and_fillet(0f32, &Vec::new(), false);

    let target_outline = kbgb_wasm::core_math::VectorPath {
        prims: vec![
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(37.575f32, 0.0f32, -19.575f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(
                66.149994f32,
                0.0f32,
                -19.575f32,
            )),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(
                66.149994f32,
                0.0f32,
                -38.625f32,
            )),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(86.25f32, 0.0f32, -38.625f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(
                86.25f32,
                0.0f32,
                0.5250015f32,
            )),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(
                37.575f32,
                0.0f32,
                0.5250006f32,
            )),
        ],
    };

    assert_eq!(
        offset_outline, target_outline,
        "test_outline_triple_overlapped"
    );
}

#[wasm_bindgen_test]
fn test_outline_quad_overlapped() {
    let key_dim = 20.10f32;
    let offset = 19.05f32;
    let offx = 70.925f32;
    let offy = -40.12f32;
    let polys = vec![
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            // Matrix4::new_translation(&Vector3::new(0f32+offx, 0f32, 0f32+offy)),
            Matrix4::new_translation(&Vector3::new(285.75f32, 0.0f32, -42.8625f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32 + offset * 0.5f32,
            key_dim * 0.5f32,
            // Matrix4::new_translation(&Vector3::new((offset*1.5f32)+offx, 0f32, 0f32+offy)),
            Matrix4::new_translation(&Vector3::new(314.325f32, 0.0f32, -42.8625f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32,
            key_dim * 0.5f32,
            // Matrix4::new_translation(&Vector3::new(offset*0.5f32+offx, 0f32, -offset+offy)),
            Matrix4::new_translation(&Vector3::new(295.275f32, 0.0f32, -61.9125f32)),
        ),
        Poly::new_rect_poly(
            key_dim * 0.5f32 + offset * 0.25f32,
            key_dim * 0.5f32,
            // Matrix4::new_translation(&Vector3::new(offset*0.5f32+(offset*1.25f32)+offx, 0f32, -offset+offy)),
            Matrix4::new_translation(&Vector3::new(319.0875f32, 0.0f32, -61.9125f32)),
        ),
    ];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let offset_outline = outline.offset_and_fillet(0f32, &Vec::new(), false);

    let target_outline = kbgb_wasm::core_math::VectorPath {
        prims: vec![
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(275.7, 0.0, -52.9125)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(285.225, 0.0, -52.9125)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(285.225, 0.0, -71.9625)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(333.9, 0.0, -71.9625)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(333.90002, 0.0, -32.8125)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(275.7, 0.0, -32.8125)),
        ],
    };

    assert_eq!(
        offset_outline, target_outline,
        "test_outline_quad_overlapped"
    );
}

#[wasm_bindgen_test]
fn test_offset_outline_fillet_solo() {
    let key_dim = 10f32;
    let polys = vec![Poly::new_rect_poly(
        key_dim * 0.5f32,
        key_dim * 0.5f32,
        Matrix4::new_translation(&Vector3::new(0f32, 0f32, 0f32)),
    )];

    let outline = CaseGeometry::get_outline_of_poly_group(polys, false);

    let offset_outline = outline.offset_and_fillet(5f32, &vec![1f32; 4], false);

    let target_outline = kbgb_wasm::core_math::VectorPath {
        prims: vec![
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(-110f32, 0f32, -10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(10f32, 0f32, -10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(10f32, 0f32, 10f32)),
            kbgb_wasm::core_math::VectorPathPrim::Point(Point3::new(-10f32, 0f32, 10f32)),
        ],
    };

    // assert_eq!(
    //     offset_outline, target_outline,
    //     "test_offset_outline_fillet_solo"
    // );
}
