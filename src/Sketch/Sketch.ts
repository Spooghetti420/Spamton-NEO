import { Game } from "../Game/Game.js";

export abstract class Sketch {

    static preload(): void 
    {
        
    }

    static setup(): void 
    {
        createCanvas(640, 480);
        frameRate(30);
    }

    static draw(): void 
    {
        background(0);
        Game.Update();
    }

}