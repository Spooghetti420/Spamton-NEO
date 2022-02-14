import { ResourceManager } from "../Framework/ResourceManager.js";
import { Game } from "../Game/Game.js";
import { StaticSprite } from "./StaticSprite.js";

export class Background extends StaticSprite
{
    static draw() 
    {
        const [relativeX, relativeY] = Game.CurrentScene().GetPositionRelativeToCamera(0, 80);
        image(ResourceManager.getSprite("assets/spr/basement.png"), relativeX, relativeY);
    }
}