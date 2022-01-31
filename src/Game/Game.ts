class Game 
{
    private static instance: Game = new Game();

    private currentScene: Scene
    private frameCount: number
    private eventQueue: GameEvent[] = [];

    private constructor() {
        this.currentScene = new OverworldScene();
        this.frameCount = 1;
        this.eventQueue = [];
    }

    static Update() {
        Game.nextFrame();
    }

    static GetFrameCount() {
        return Game.instance.frameCount;
    }

    static AddEvent(event: GameEvent) {
        Game.instance.eventQueue.push(event);
    }

    private static nextFrame() {
        // this.currentScene.nextFrame();
        Game.instance.eventQueue.forEach(event => {
            event.run();
            if (event.IsComplete())
            Game.instance.eventQueue.splice(Game.instance.eventQueue.indexOf(event), 1);
        });
        Game.instance.frameCount++;
    }
}