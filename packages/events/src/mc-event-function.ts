import { Datapack, MCFunction } from "@datapackjs/core"
import { CommandResolvable, MCFunctionFactory } from "@datapackjs/core/types/internal";
import { ObjectiveType } from "@datapackjs/core/types/scoreboard";

export class MCEventFunction implements MCFunction {

  private constructor(
    public readonly name: string,
    public readonly event: string,
    public readonly commands: Array<CommandResolvable>,
    public readonly datapack: Datapack
  ) { }

  public commandRef = `function ${this.datapack.name}:${this.name}`;

  public static define(name: string, event: ObjectiveType, commands: Array<CommandResolvable>): MCFunctionFactory {
    return (datapack) => {

      const objectiveName = `__ev_${datapack.name}_${name}`;

      const func = new this(name, event, [
        `scoreboard players set @s ${objectiveName} 1`,
        ...commands.map(datapack.resolveCommand),
        `scoreboard players reset @a ${objectiveName}`
      ], datapack);

      datapack.insertLoadCommands(
        `scoreboard objectives add ${objectiveName} ${event} "§bEVENT_LISTENER(§e${name}§b)"`
      );

      datapack.insertTickCommands(
        `execute as @a[scores={${objectiveName}=1..}] run ${func.commandRef}`
      );

      return func;
    }
  }

}