class StaticSprite extends Sprite
{
    /* 
        Represents a sprite that will not move during its lifetime.
        Its draw function is generally always the same, just with a different image used.
    */

    private readonly x: number;
    private readonly y: number;

    constructor(x: number, y: number) 
    {
        super();
        this.x = x;
        this.y = y;
    }

    update() {}
    draw() {}
}