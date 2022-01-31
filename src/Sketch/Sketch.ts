abstract class Sketch {

    static preload(): void 
    {
        
    }

    static setup(): void 
    {
        createCanvas(640, 480);
        frameRate(30);
        background(0);
        Game.AddEvent(
            OnFrame(100, ()=>{console.log(`Hello world! Current frame count is ${Game.GetFrameCount()}` )})
        )
    }

    static draw(): void 
    {
        Game.Update();
    }

}
