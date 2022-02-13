import { FacingDirection } from "../Framework/FacingDirection.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { OverworldScene } from "../Scene/OverworldScene.js";
import { Sprite } from "./Sprite.js";

export class Kris extends Sprite {

    private x: number;
    private y: number;
    private facing: FacingDirection;
    private walkPhase: number;

    constructor() 
    {
        super();
        this.x = 0;
        this.y = 0;
        this.facing = FacingDirection.UP;
        this.walkPhase = 0;
    }

    update()
    {

    }

    draw()
    {

        const [relativeX, relativeY] = Game.CurrentScene()!.GetPositionRelativeToCamera(this.x, this.y);
        image(
            ResourceManager.getSprite("assets/spr/kris" + this.facing + "_" + this.walkPhase.toString() + ".png")!,
            relativeX, relativeY
        );
    }
}