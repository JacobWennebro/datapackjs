import { CommandResolvable, MCFunctionFactory, Transformer } from "../types/internal";
import { DatapackJSError } from "./error";
import { MCFunction } from "./mc-function";
import { isSafeDirectoryName } from "./utility";
import { createWriteStream } from "fs";
import ZipStream from "zip-stream";

export class Datapack {
  private functions: Set<MCFunction> = new Set();
  private transformers: Set<any> = new Set();

  private archive = new ZipStream();
  private loadCommands: Array<string> = []
  private tickCommands: Array<string> = []

  public name: string;

  public constructor(
    public packFormat: number,
    name: string,
    public description: string
  ) {
    if (!isSafeDirectoryName(name)) {
      throw new DatapackJSError('Datapack name may only contain directory-safe characters.')
    }

    this.name = name;
  }

  private addFileEntry(path: string, contents: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.archive.entry(contents, { name: path }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  private async bootstrapFiles() {
    await this.addFileEntry('pack.mcmeta', JSON.stringify({
      pack: {
        pack_format: this.packFormat,
        description: this.description
      }
    }));

    await this.addFileEntry('data/minecraft/tags/function/tick.json', JSON.stringify({
      values: [
        `${this.name}:tick`
      ]
    }));

    await this.addFileEntry('data/minecraft/tags/function/load.json', JSON.stringify({
      values: [
        `${this.name}:load`
      ]
    }));
  }

  private internal_registerFunction(name: string, commands: Array<string>) {
    const functionFactory = MCFunction.define(name, commands);
    this.functions.add(functionFactory(this));
  }

  public addTransformationStep(transformer: Transformer) {
    this.transformers.add(transformer);
  }

  public resolveCommand(resolvable: CommandResolvable) {
    if (typeof resolvable === 'function') {
      return resolvable(this).commandRef
    }

    if (typeof resolvable === 'string') {
      return resolvable;
    }

    throw new DatapackJSError(`Failed to resolve command resolvable.`)
  }

  public insertLoadCommands(...commands: Array<string>) {
    this.loadCommands.push(...commands);
  }

  public insertTickCommands(...commands: Array<string>) {
    this.tickCommands.push(...commands);
  }

  public registerFunction(functionFactory: MCFunctionFactory) {
    const mcfunction = functionFactory(this)

    if (['load', 'tick'].includes(mcfunction.name)) {
      throw new DatapackJSError(
        `You may not create a function named "${mcfunction.name}", this name is protected.`
      )
    }

    this.functions.add(mcfunction);
  }

  public async build({ output: outputPath }: { output: string }) {
    const output = createWriteStream(outputPath);

    await this.bootstrapFiles()

    this.internal_registerFunction('load', this.loadCommands);
    this.internal_registerFunction('tick', this.tickCommands);

    try {
      for (const { name: funcName, commands } of this.functions) {
        let contents = commands
          .map(this.resolveCommand)
          .join('\n')

        for (const transformer of this.transformers) {
          contents = transformer(contents)
        }

        await this.addFileEntry(
          `data/${this.name}/function/${funcName}.mcfunction`,
          contents
        );
      }

      this.archive.finish();
    } catch (err) {
      throw new DatapackJSError(`Error building the ZIP: ${(err as Error).message}`);
    }

    this.archive.pipe(output);

    return output;
  }

}