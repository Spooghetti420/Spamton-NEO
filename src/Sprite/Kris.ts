import { FacingDirection } from "../Framework/FacingDirection.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { Sprite } from "./Sprite.js";

export class Kris extends Sprite {

    public x: number;
    public y: number;
    public canMove: boolean;
    private facing: FacingDirection;
    private walkPhase: number;
    private walkAnimationTimer: number;
    private static readonly BASE_SPEED = 4; // Initial speed without holding shift
    private static readonly RUN_SPEED = 6; // Speed after holding shift
    private static readonly SPRINT_SPEED = 7; // Speed after holding shift for 10 frames (1/3 second)
    private static readonly MAX_SPEED = 8;


    constructor() 
    {
        super();
        this.x = 400;
        this.y = 200;
        this.canMove = true;
        this.facing = FacingDirection.UP;
        this.walkPhase = 0;
        this.walkAnimationTimer = 0;
    }

    getMoveSpeed() 
    {
        if (!this.canMove) return 0;
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
           Returns a vector consisting of [dx, dy], which is the amount by
           which the player should move the current frame.
        */
        const moveSpeed = this.getMoveSpeed();
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

    private orientate(): void
    {
        // Updates the player's direction and animation frame.
        const prevDirection = this.facing;
        if (KeyboardManager.KeyIsHeld(RIGHT_ARROW)) {
            if (!KeyboardManager.KeyIsHeld(UP_ARROW)
                && !KeyboardManager.KeyIsHeld(DOWN_ARROW))
            {
                this.facing = FacingDirection.RIGHT;
            }
        } else if (KeyboardManager.KeyIsHeld(LEFT_ARROW)) {
            if (!KeyboardManager.KeyIsHeld(UP_ARROW)
                && !KeyboardManager.KeyIsHeld(DOWN_ARROW))
            {
                this.facing = FacingDirection.LEFT;
            }
        }

        if (KeyboardManager.KeyIsHeld(UP_ARROW)) {
            if (!KeyboardManager.KeyIsHeld(RIGHT_ARROW)
                && !KeyboardManager.KeyIsHeld(LEFT_ARROW))
            {
                this.facing = FacingDirection.UP;
            }
        } else if (KeyboardManager.KeyIsHeld(DOWN_ARROW)) {
            if (!KeyboardManager.KeyIsHeld(RIGHT_ARROW)
                && !KeyboardManager.KeyIsHeld(LEFT_ARROW))
            {
                this.facing = FacingDirection.DOWN;
            }            
        }
    }

    private walkAnimation(): void 
    {
        if (this.facing === FacingDirection.RIGHT && KeyboardManager.KeyIsHeld(RIGHT_ARROW)
            || this.facing === FacingDirection.LEFT && KeyboardManager.KeyIsHeld(LEFT_ARROW)
            || this.facing === FacingDirection.UP && KeyboardManager.KeyIsHeld(UP_ARROW)
            || this.facing === FacingDirection.DOWN && KeyboardManager.KeyIsHeld(DOWN_ARROW))
        {
            this.walkAnimationTimer++;
            if (this.walkAnimationTimer >= 4)
            {
                this.walkPhase++;
                this.walkPhase %= 3;
                this.walkAnimationTimer = 0;
            }
        }
    }

    update()
    {
        this.orientate();
        this.walkAnimation();
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