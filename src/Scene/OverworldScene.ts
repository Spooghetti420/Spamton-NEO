import { Background } from "../Sprite/Background.js";
import { Kris } from "../Sprite/Kris.js";
import { Rail } from "../Sprite/Rail.js";
import { Scene } from "./Scene.js";

export class OverworldScene extends Scene 
{
    private readonly rails: Rail[] = []; 
    private player = new Kris();
    init() 
    {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                this.rails.push(new Rail(640 * i, 180 + 60 * j));
            }
        }
    }
    
    update() 
    {
        const playerSpeed = Kris.getMoveSpeed();
        if (keyIsDown(RIGHT_ARROW)) {
            this.camera.x += playerSpeed;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.camera.x -= playerSpeed;
        }
        Background.draw();
        for (let rail of this.rails) 
        {
            rail.draw();
        }
        this.player.update();
        this.player.draw();
    }
}