import { Text } from "../Framework/Text.js";
import { StaticSprite } from "./StaticSprite.js";

export class TextBox extends StaticSprite
{

    constructor(x: number, y: number) 
    {
        super(x, y);
    }

    update() {}
    draw()
    {
        fill(0);
        rect(this.x, this.y, 300, 100);
        Text.Draw("お前はもう死んでいる", this.x, this.y);
    }
}