import { ResourceManager } from "../Framework/ResourceManager.js";
import { StaticSprite } from "./StaticSprite.js";

class Rail extends StaticSprite 
{
    draw()
    {
        // Draw the rail
        const tex = ResourceManager.getSprite("assets/spr/sneo_track.png");
        if (tex)
            image(tex, this.x, this.y);
    }
}

export { Rail };