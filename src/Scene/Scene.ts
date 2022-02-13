import { Camera } from "../Framework/Camera.js";

abstract class Scene 
{
    protected camera: Camera;
    public abstract init(): void;
    public abstract update(): void;

    constructor() {
        this.camera = new Camera();
    }

    GetPositionRelativeToCamera(x: number, y: number)
    {
        return [x - this.camera.x, y - this.camera.y]; 
    }
    
}

export { Scene }