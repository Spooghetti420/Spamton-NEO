import { Sketch } from "./Sketch/Sketch.js";


// Hack to allow overriding nonexistent window properties
interface p5Window extends Window 
{
    preload: CallableFunction,
    setup: CallableFunction,
    draw: CallableFunction
}
declare let window: p5Window;

// Using p5.js to manage the canvas, etc.
window.preload = function () {
    Sketch.preload();
}

window.setup = function() {
    Sketch.setup();
}

window.draw = function () {
    Sketch.draw();
}