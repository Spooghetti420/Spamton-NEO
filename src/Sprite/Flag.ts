import { Image } from "p5";
import { StaticSprite } from "./StaticSprite.js";

export class Flag extends StaticSprite
{
    private image: Image;

    constructor(x: number, y: number, image: Image)
    {
        super(x, y);
        this.image = image;
    }

    public draw(): void
    {
        push();
        if (this.IsBeingHoveredOver())
            tint(224);

        image(this.image, this.x, this.y);
        pop();
    }

    IsBeingHoveredOver(): boolean
    {
        return (mouseX > this.x && mouseX < this.x + this.image.width
            && mouseY > this.y && mouseY < this.y + this.image.height);
    }
}