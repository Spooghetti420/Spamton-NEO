import { Game } from "../Game/Game";

abstract class Sprite
{
    public abstract draw(game: Game): void;
    public abstract update(game: Game): void;
}

export { Sprite }