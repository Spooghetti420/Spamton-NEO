import { FacingDirection } from "../Framework/FacingDirection.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { Sprite } from "./Sprite.js";

export class Kris extends Sprite {

    private x: number;
    private y: number;
    private facing: FacingDirection;
    private walkPhase: number;
    private static readonly BASE_SPEED = 4; // Initial speed without holding shift
    private static readonly RUN_SPEED = 6; // Speed after holding shift
    private static readonly SPRINT_SPEED = 7; // Speed after holding shift for 10 frames (1/3 second)
    private static readonly MAX_SPEED = 8;


    constructor() 
    {
        super();
        this.x = 400;
        this.y = 200;
        this.facing = FacingDirection.UP;
        this.walkPhase = 0;
    }

    static getMoveSpeed() 
    {
        let moveSpeed = Kris.BASE_SPEED;
        if (KeyboardManager.KeyHoldDuration(SHIFT) >= 60)
            moveSpeed = Kris.MAX_SPEED
        else if (KeyboardManager.KeyHoldDuration(SHIFT) >= 10)
            moveSpeed =  Kris.SPRINT_SPEED;
        else if (KeyboardManager.KeyIsHeld(SHIFT))
            moveSpeed = Kris.RUN_SPEED;
        return moveSpeed;
    }

    update()
    {
        const moveSpeed = Kris.getMoveSpeed();
        if (KeyboardManager.KeyIsHeld(RIGHT_ARROW)) {
            this.x += moveSpeed;
        } else if (KeyboardManager.KeyIsHeld(LEFT_ARROW)) {
            this.x -= moveSpeed;
        }

        if (KeyboardManager.KeyIsHeld(UP_ARROW)) {
            this.y -= moveSpeed;
        } else if (KeyboardManager.KeyIsHeld(DOWN_ARROW)) {
            this.y += moveSpeed;
        }
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