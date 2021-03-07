const keyBindings = {"keydown": {}};

export function addBinding(eventName, keyName, action) {
    if(keyBindings[eventName][keyName]) {
        console.log(`rebinding event ${eventName} key ${keyName}`);
    }
    keyBindings[eventName][keyName] = action;
}

export function removeBinding(eventName, keyName) {
    keyBindings[eventName][keyName] = null;
}

function keydownEvent(event) {
    if(keyBindings["keydown"][event.key]) {
        keyBindings["keydown"][event.key](event);
    }
    else {
        console.log(`unbound key ${event.key}`)
    }
}
export function init() {
    window.addEventListener('keydown', event => keydownEvent(event))
}