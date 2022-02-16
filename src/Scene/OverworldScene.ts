import { Game } from "../Game/Game.js";
import { GameEvent } from "../GameEvent/GameEvent.js";
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
        // Game.AddEvent(
        //     // Spamton mock encounter
        //     new GameEvent(
        //         () => {
        //             return this.player.x < 180
        //         },
        //         () => {
        //             this.player.canMove = false;
        //         }
                
        //     )
        // )
    }

    private scroll(): void
    {
        const scrollAmount = this.player.makeMove()[0]; // Get x value from player movement
        // const scrollOffset = this.camera.x - this.player.x;
        // if (keyIsDown(RIGHT_ARROW) && (this.player.x > 240 || this.player.x < 1080)) {
        //     this.camera.x += playerSpeed;
        // } else if (keyIsDown(LEFT_ARROW) && (this.player.x < 240 || this.player.x > 1080)) {
        //     this.camera.x -= playerSpeed;
        // }
        if (this.player.x > 320 && this.player.x < 1120)
            this.camera.x += scrollAmount;
    }
    
    update() 
    {
        this.scroll();
        Background.draw();
        for (let rail of this.rails) 
        {
            rail.draw();
        }
        this.player.update();
        this.player.draw();
    }
}