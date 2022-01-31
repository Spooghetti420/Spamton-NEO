abstract class Scene 
{
    protected camera: Camera;
    public abstract init(): void;
    public abstract update(): void;

    constructor() {
        this.camera = new Camera();
    }
}