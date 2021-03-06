export const tuning = {
    keyDims: [18.0, 18.0],
    switchCutout: [14.0, 14.0],
    base1U: [19.05, 19.05],
    bezelGap: 1.05,
    bezelCornerFillet: 1.0,
    layerOffsets: {},
    screwTypes:{"m2_simple":      {minBoss:1.5,screwHoleRadius:2.3/2.0,standoffRadius:3.2/2.0},
                "m2_5_hex_standoffs": {minBoss:1.5,screwHoleRadius:2.9/2.0,hexSize:4.5},
                "m3_tallnut":   {minBoss:1.5,screwHoleRadius:3.3/2.0,nutRadius:4.2/2.0}},
    screwSideBuffer: 0,
    keyShape:"square",
    drawCase:true,
    drawBezel:true,
    drawPlate:true,
    drawPCB:true,
    defaultCase: {
        bezelThickness: 12,
        bezelConcavity: 1.0,
        caseCornerFillet: 6,
        screwSideBuffer: 0,
        maxScrewSpan: 150,
        screwBezelBias:0.5,
        forceSymmetrical:true,
        hasUSBPort:false,
        usbPortPos:1.85,
        usbPortCentered:true,
        caseType:"rectangle"
    },
    caseMats: {
        "ac_blue": {
            metallic:0,
            roughness:0.2,
            baseColor:[12/255, 237/255, 239/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.75
        },
        "ac_smoke": {
            metallic:0,
            roughness:0.2,
            baseColor:[12/255, 12/255, 12/255],
            albedoColor:[0.5,0.5,0.5],
            alpha:0.75
        },
        "ac_purple": {
            metallic:0,
            roughness:0.2,
            baseColor:[98/255, 7/255, 147/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.82
        },
        "ac_yellow": {
            metallic:0,
            roughness:0.2,
            baseColor:[255/255, 247/255, 71/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.84
        },
        "pc_cl": {
            metallic:0,
            roughness:0.8,
            baseColor:[200/255, 200/255, 200/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.85
        },
        "aluminium":{alpha:1, metallic:1, roughness:0.2, albedoColor:[0.5,0.5,0.5]},
        "pom_white":{alpha:1, metallic:0, roughness:0.4, albedoColor:[0.9,0.9,0.9]},
        "pom_black":{alpha:1, metallic:0, roughness:0.4, albedoColor:[0.02,0.02,0.02]},
        "steel":{alpha:1, metallic:1, roughness:0.05, albedoColor:[0.3,0.3,0.3]},
        "fr4":{alpha:1, metallic:0, roughness:0.15, albedoColor:[45/255, 90/255, 10/255]},
    }
}