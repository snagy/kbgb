const keyBindings = {"keydown": {}};
const pointerBindings = {};

export function addBinding(eventName, keyName, action) {
    if(keyBindings[eventName][keyName]) {
        console.log(`rebinding event ${eventName} key ${keyName}`);
    }
    keyBindings[eventName][keyName] = action;
}

export function removeBinding(eventName, keyName) {
    keyBindings[eventName][keyName] = null;
}

export function addPointerBinding(evName, action) {
    if(pointerBindings[evName]) {
        console.log(`rebinding pointer event ${evName}`)
    }
    pointerBindings[evName] = action;
}

export function removePointerBinding(evName) {
    pointerBindings[evName] = null;
}

function keydownEvent(event) {
    if(keyBindings["keydown"][event.key]) {
        keyBindings["keydown"][event.key](event);
    }
    else {
        console.log(`unbound key ${event.key}`)
    }
}

export function init(scene) {
    window.addEventListener('keydown', event => keydownEvent(event))

    scene.onPointerObservable.add((pointerInfo) => {
        if(pointerBindings[pointerInfo.type]) {
            pointerBindings[pointerInfo.type](pointerInfo);
        }
        else {
            console.log(`unbound pointer event ${pointerInfo.type}`)
        }
            // case PointerEventTypes.POINTERDOWN:
            // case PointerEventTypes.POINTERUP:
            // case PointerEventTypes.POINTERMOVE:
            // case PointerEventTypes.POINTERWHEEL:
            // case PointerEventTypes.POINTERPICK:
            // case PointerEventTypes.POINTERTAP:
            // case PointerEventTypes.POINTERDOUBLETAP:
    });
}