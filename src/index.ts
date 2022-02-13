import { Sketch } from "./Sketch/Sketch.js";


// Hack to allow overriding nonexistent window properties
interface p5Window extends Window 
{
    preload: CallableFunction,
    setup: CallableFunction,
    draw: CallableFunction
}

// Using p5.js to manage the canvas, etc.
declare let window: p5Window;
window.preload = function () {
    Sketch.preload();
}

window.setup = function() {
    Sketch.setup();
}

window.draw = function () {
    Sketch.draw();
}