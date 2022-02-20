import { Game } from "../Game/Game.js";
import { Languages } from "./Enumarable/Language.js";
import { ResourceManager } from "./ResourceManager.js";

export class Text 
{    
    static Draw(str: string, x: number, y: number)
    {
        push();
        textFont(ResourceManager.getFont(Text.GetCurrentFont()));
        textAlign(LEFT, TOP)
        textSize(27);
        fill(255);
        text(str, x, y);
        pop();
    }

    private static GetCurrentFont(): string
    {
        return `assets/font/${Game.GetLanguage()}_main.${Game.GetLanguage() === Languages.ENGLISH ? "otf" : "woff"}`;
    }

    static GetWidth(str: string): number
    {
        let size: number;
        push();
        textFont(ResourceManager.getFont(Text.GetCurrentFont()));
        textSize(27);
        size = textWidth(str);
        pop();
        return size;
    }
}