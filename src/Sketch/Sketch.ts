import { Game } from "../Game/Game.js";
import { OverworldScene } from "../Scene/OverworldScene.js";

export abstract class Sketch {

    static preload(): void 
    {
        
    }

    static setup(): void 
    {
        Game.ChangeScene(new OverworldScene());
        createCanvas(640, 480);
        frameRate(30);
    }

    static draw(): void 
    {
        background(0);
        Game.Update();
    }

}