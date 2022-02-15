import { FacingDirection } from "../Framework/FacingDirection.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { Sprite } from "./Sprite.js";

export class Kris extends Sprite {

    public x: number;
    public y: number;
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

    public makeMove(): number[]
    {
        /* This method is also used by the OverworldScene to determine
           whether the screen should scroll when the player reaches the wall. 
        */
        const moveSpeed = Kris.getMoveSpeed();
        let dx: number = 0;
        let dy: number = 0;
        
        if (KeyboardManager.KeyIsHeld(RIGHT_ARROW)) {
            dx = moveSpeed;
            if (this.x + dx > 1240)
                // If the base speed is within bounds but the sprint is not, then move by the base speed instead. 
                dx = (this.x + Kris.BASE_SPEED > 1240) ? 0 : Kris.BASE_SPEED;
        } else if (KeyboardManager.KeyIsHeld(LEFT_ARROW)) {
            dx = -moveSpeed;
            if (this.x + dx < 0)
                dx = (this.x - Kris.BASE_SPEED < 0) ? 0 : -Kris.BASE_SPEED;
        }

        if (KeyboardManager.KeyIsHeld(UP_ARROW)) {
            dy = -moveSpeed;
            if (this.y + dy < 160)
                dy = (this.y - Kris.BASE_SPEED < 160) ? 0 : -Kris.BASE_SPEED;
        } else if (KeyboardManager.KeyIsHeld(DOWN_ARROW)) {
            dy = moveSpeed;
            if (this.y + dy > 320)
                dy = (this.y + Kris.BASE_SPEED > 320) ? 0 : Kris.BASE_SPEED;
        }

        return [dx, dy];
    }

    update()
    {
        const movement = this.makeMove();
        this.x += movement[0];
        this.y += movement[1];
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