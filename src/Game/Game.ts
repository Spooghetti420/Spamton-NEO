class Game 
{
    static instance = new Game();

    currentScene: Scene;

    private constructor() {
        this.currentScene = new OverworldScene();
    }

    static get() {
        return Game.instance;
    }
}