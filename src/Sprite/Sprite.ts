import { Game } from "../Game/Game";

export abstract class Sprite
{
    public abstract draw(game: Game): void;
    public abstract update(game: Game): void;
}