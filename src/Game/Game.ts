import { GameEvent } from "../GameEvent/GameEvent.js";
import { DummyScene } from "../Scene/DummyScene.js";
import { Scene } from "../Scene/Scene.js";

export class Game 
{
    private static instance: Game = new Game();

    private currentScene: Scene
    private frameCount: number
    private eventQueue: GameEvent[] = [];

    private constructor() {
        this.currentScene = new DummyScene();
        this.frameCount = 1;
        this.eventQueue = [];
    }

    static Update()
    {
        Game.instance.nextFrame();
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

    static Get() {
        return Game.instance;
    }

    private nextFrame()
    {
        if (!this.currentScene)
            return
        this.currentScene.update();
        this.eventQueue.forEach(event => 
        {
            event.run();
            if (event.IsComplete())
            this.eventQueue.splice(this.eventQueue.indexOf(event), 1);
        });
        this.frameCount++;
    }
}