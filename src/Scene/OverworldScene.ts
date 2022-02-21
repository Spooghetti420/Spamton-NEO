import { SoundFile } from "p5";
import { Camera } from "../Framework/Camera.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { debug, Game } from "../Game/Game.js";
import { AfterNFrames, OnFrame } from "../GameEvent/FrameEvent.js";
import { GameEvent } from "../GameEvent/GameEvent.js";
import { Background } from "../Sprite/Background.js";
import { Kris } from "../Sprite/Kris.js";
import { Rail } from "../Sprite/Rail.js";
import { TextBox } from "../Sprite/TextBox.js";
import { Scene } from "./Scene.js";

export class OverworldScene extends Scene 
{
    private readonly rails: Rail[] = [];
    public readonly player = new Kris();
    private textbox: TextBox | null = null;
    private playingMusic: SoundFile = ResourceManager.getSound("assets/mus/spamton_basement.ogg");
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
        if (!debug)
        {
            this.playingMusic.loop();
            this.playingMusic.play();
        }
        Game.AddEvent(
            AfterNFrames(4, ()=> {
                this.textbox = new TextBox("ちょっと冗談書いてみたね");
            })
        )
    }

    private scroll(): void
    {
        const scrollAmount = this.player.makeMove()[0]; // Get x value from player movement

        if (this.player.x > 240 && this.player.x < 1020)
            this.camera.x += scrollAmount;
    }
    
    update() 
    {
        background(0);
        
        this.scroll();
        Background.draw();
        for (let rail of this.rails)
        {
            rail.draw();
        }
        this.player.update();
        this.player.draw();
        if (this.textbox)
        {
            this.textbox.update();
            this.textbox.draw();
            if (this.textbox.IsComplete())
            {
                this.textbox = null;
                this.player.canMove = true;
                
            }
        }
    }
}