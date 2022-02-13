import { Game } from "../Game/Game.js";
import { Rail } from "../Sprite/Rail.js";
import { Scene } from "./Scene.js";

export class OverworldScene extends Scene 
{
    private readonly rails: Rail[] = []; 
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
        if (keyIsDown(RIGHT_ARROW)) {
            this.camera.x += 5;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.camera.x -= 5;
        }
        for (let rail of this.rails) 
        {
            rail.draw(Game.Get());
        }
    }
}