#[derive(Debug, PartialEq, Eq, Hash)]
pub enum LayerShapes {
    PCBOutline,
    CavityInner,
    CaseFrame,
    Foot,
    BezelHoles,
    ScrewHoles,
    SwitchCuts,
}


impl Default for LayerShapes {
    fn default() -> Self { LayerShapes::CavityInner }
}

#[derive(Debug, Default, Clone)]
pub struct LayerOverride {
    pub bezel_thickness: Option<f32>,
}


#[derive(Debug, Default)]
pub struct LayerDefinition {
    pub name: String,
    pub height: f32,
    pub offset: f32,
    pub stack_order: i32,
    pub base_shape: LayerShapes,
    pub has_port_cut: bool,
    pub user_tunable: bool,
    pub hole_shapes: Vec<LayerShapes>,
}

#[derive(Debug)]
pub struct LayerSet {
    pub layer_definitions: Vec<LayerDefinition>,
    pub layer_overrides: Vec<LayerOverride>,
}

impl LayerSet {
    pub fn new() -> LayerSet {
        let mut new_set = LayerSet {
            layer_definitions: Vec::new(),
            layer_overrides: Vec::new(),
        };
        new_set.reset_to_default();
        return new_set;
    }

    pub fn set_layer_bezel_thickness(&mut self, layer_name: &str, thickness: f32) {
        for i in 0..self.layer_definitions.len() {
            let l =  &self.layer_definitions[i];
            if l.name == layer_name {
                self.layer_overrides[i].bezel_thickness = Some(thickness);
            }
        }
    }

    pub fn reset_to_default(&mut self) {
        self.layer_definitions = vec![
            LayerDefinition {
                name: "pcbMesh".to_string(),
                height: 1.6f32,
                offset: -5.1f32,
                stack_order: -1000,
                base_shape: LayerShapes::PCBOutline,
                has_port_cut: false,
                user_tunable: false,
                hole_shapes: Vec::new(),
            },
            LayerDefinition {
                name: "plateFoam".to_string(),
                height: 3.5f32,
                offset: -1.5f32,
                stack_order: -1000,
                base_shape: LayerShapes::PCBOutline,
                has_port_cut: false,
                user_tunable: false,
                hole_shapes: vec![LayerShapes::SwitchCuts],
            },
            LayerDefinition {
                name: "caseFoam".to_string(),
                height: 3.5f32,
                offset: -7.5f32,
                stack_order: -1000,
                base_shape: LayerShapes::CavityInner,
                has_port_cut: false,
                user_tunable: false,
                hole_shapes: Vec::new(),
            },
            LayerDefinition {
                name: "bezel".to_string(),
                height: 3f32,
                offset: 6f32,
                stack_order: 2i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: false,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::BezelHoles, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "bezel1".to_string(),
                height: 3f32,
                offset: 3f32,
                stack_order: 1i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: false,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::BezelHoles, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "plate".to_string(),
                height: 1.5f32,
                offset: 0f32,
                stack_order: 0i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: false,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::SwitchCuts, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "edge".to_string(),
                height: 3f32,
                offset: -1.5f32,
                stack_order: -1i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: true,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::CavityInner, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "edge2".to_string(),
                height: 3f32,
                offset: -1.5f32,
                stack_order: -1i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: true,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::CavityInner, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "edge3".to_string(),
                height: 3f32,
                offset: -1.5f32,
                stack_order: -1i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: true,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::CavityInner, LayerShapes::ScrewHoles],
            },
            LayerDefinition {
                name: "bottom".to_string(),
                height: 3f32,
                offset: -10.5f32,
                stack_order: -4i32,
                base_shape: LayerShapes::CaseFrame,
                has_port_cut: false,
                user_tunable: true,
                hole_shapes: vec![LayerShapes::ScrewHoles],
            },
        ];
        self.layer_overrides = vec![Default::default(); self.layer_definitions.len()];
    }
}

pub struct BoardData {}

// export const layerDefs = {
//     "pcbMesh":{height:1.6,offset:-5.1,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],material:"fr4",physicalMat:"FR4",tuneable:null},
//     "plateFoam":{height:3.5,offset:-1.5,stackOrder:null,visFilter:"drawPlateFoam",shape:"pcbOutline",holes:["switchCuts"],material:"foam_white",physicalMat:"FOAM",tuneable:null},
//     "caseFoam":{height:3.5,offset:-7.5,stackOrder:null,visFilter:"drawCaseFoam",shape:"cavityInner",holes:[],material:"foam_white",physicalMat:"FOAM",tuneable:null},
//     "bezel":{height:3,offset:6,stackOrder:2,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
//     "bezel1":{height:3,offset:3,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
//     "plate":{height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","switchCuts"],mat:"plate",physicalMat:"alu"},
//     "edge":{height:3,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
//     "edge2":{height:3,offset:-4.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
//     "edge3":{height:3,offset:-7.5,stackOrder:-3,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
//     "bottom":{height:3,offset:-10.5,stackOrder:-4,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case",physicalMat:"acrylic"},
//     "feet4":{height:3,offset:-13.5,stackOrder:-5,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:4.0,physicalMat:"acrylic",tuneable:null},
//     "feet3":{height:3,offset:-16.5,stackOrder:-6,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:3.0,physicalMat:"acrylic",tuneable:null},
//     "feet2":{height:3,offset:-19.5,stackOrder:-7,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:2.0,physicalMat:"acrylic",tuneable:null},
//     "feet1":{height:3,offset:-22.5,stackOrder:-8,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:1.0,physicalMat:"acrylic",tuneable:null},
//     "feet":{height:3,offset:-25.5,stackOrder:-9,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:0.0,physicalMat:"acrylic",tuneable:null}
// };
