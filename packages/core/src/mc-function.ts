import { CommandResolvable, MCFunctionFactory } from "../types/internal";
import { Datapack } from "./datapack";

export class MCFunction {

  private constructor(
    public readonly name: string,
    public readonly commands: Array<CommandResolvable>,
    public readonly datapack: Datapack
  ) { }

  public commandRef = `function ${this.datapack.name}:${this.name}`;

  public static define(name: string, commands: Array<CommandResolvable>): MCFunctionFactory {
    return (datapack) => new this(name, commands, datapack)
  }

}