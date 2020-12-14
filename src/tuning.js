export const tuning = {
    keyDims: [18.0, 18.0],
    switchCutout: [14.0, 14.0],
    base1U: [19.05, 19.05],
    bezelGap: 1.05,
    bezelThickness: 12,
    caseCornerFillet: 6,
    bezelCornerFillet: 1.0,
    screwTypes:{"m2_simple":      {minBoss:1.5,screwHoleRadius:2.3/2.0},
                "m2_5_standoffs": {minBoss:1.5,screwHoleRadius:2.9/2.0,hexSize:4.5}},
    screwSideBuffer: 0,
    maxScrewSpan: 150,
    screwBezelBias:0.5,
    keyShape:"square",
    drawCase:true,
    drawBezel:true,
    drawPlate:true,
    drawPCB:true
}