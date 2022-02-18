import { Game } from "../Game/Game.js";
import { Languages } from "./Enumarable/Language.js";
import { ResourceManager } from "./ResourceManager.js";

export class Text 
{    
    static Draw(str: string, x: number, y: number)
    {
        const fontName = `assets/font/${Game.GetLanguage()}_main.${Game.GetLanguage() === Languages.ENGLISH ? "otf" : "ttf"}`;
        console.log(fontName);
        push();
        textFont(ResourceManager.getFont(fontName));
        textAlign(LEFT, TOP)
        textSize(28);
        fill(255);
        text(str, x, y);
        pop();
    }
}