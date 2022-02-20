import { Languages } from "../Framework/Enumarable/Language.js";
import { KeyboardManager } from "../Framework/KeyboardManager.js";
import { MouseManager } from "../Framework/MouseManager.js";
import { ResourceManager } from "../Framework/ResourceManager.js";
import { GameEvent } from "../GameEvent/GameEvent.js";
import { DummyScene } from "../Scene/DummyScene.js";
import { Scene } from "../Scene/Scene.js";

export const debug = true;
export class Game 
{
    private static instance: Game = new Game();

    private currentScene: Scene
    private frameCount: number
    private eventQueue: GameEvent[] = [];
    private language: Languages = Languages.ENGLISH;

    private constructor() {
        this.currentScene = new DummyScene();
        this.frameCount = 1;
        this.eventQueue = [];
    }

    static Update()
    {
        KeyboardManager.update();
        MouseManager.update();
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

    static SetLanguage(language: Languages)
    {
        Game.instance.language = language;
        ResourceManager.getLanguage(Game.instance.language); // Load the correct language's strings from JSON file
    }

    static GetLanguage(): Languages
    {
        return Game.instance.language;
    }

    static Strings()
    {
        return ResourceManager.getLanguage(Game.instance.language);
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