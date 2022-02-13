import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { StaticSprite } from "./StaticSprite.js";

export class Rail extends StaticSprite 
{
    draw()
    {
        // Draw the rail
        const tex = ResourceManager.getSprite("assets/spr/sneo_track.png");
        const [relativeX, relativeY] = Game.CurrentScene()!.GetPositionRelativeToCamera(this.x, this.y);
        if (tex)
            image(tex, relativeX, relativeY);
    }
}

// export { Rail };