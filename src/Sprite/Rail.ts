import { ResourceManager } from "../Framework/ResourceManager.js";
import { StaticSprite } from "./StaticSprite.js";

export class Rail extends StaticSprite 
{
    draw(game: any)
    {
        // Draw the rail
        const tex = ResourceManager.getSprite("assets/spr/sneo_track.png");
        const [relativeX, relativeY] = game.currentScene.GetPositionRelativeToCamera(this.x, this.y);
        if (tex)
            image(tex, relativeX, relativeY);
    }
}

// export { Rail };