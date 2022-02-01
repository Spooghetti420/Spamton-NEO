import { GameEvent } from "../GameEvent/GameEvent.js";
import { OverworldScene } from "../Scene/OverworldScene.js";
import { Scene } from "../Scene/Scene.js";

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

    static Update()
    {
        Game.nextFrame();
    }

    static GetFrameCount()
    {
        return Game.instance.frameCount;
    }

    static AddEvent(event: GameEvent)
    {
        Game.instance.eventQueue.push(event);
    }

    static CurrentScene() 
    {
        return Game.instance.currentScene;
    }

    static ChangeScene(newScene: Scene)
    {
        Game.instance.currentScene = newScene;
        newScene.init();
    }

    private static nextFrame()
    {
        // this.currentScene.nextFrame();
        Game.instance.eventQueue.forEach(event => 
        {
            event.run();
            if (event.IsComplete())
            Game.instance.eventQueue.splice(Game.instance.eventQueue.indexOf(event), 1);
        });
        Game.instance.frameCount++;
    }
}

export { Game }