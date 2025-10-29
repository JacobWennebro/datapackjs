import { Datapack } from "../src/datapack";
import { MCFunction } from "../src/mc-function";

export type MCFunctionFactory = (datapack: Datapack) => MCFunction;

export type CommandResolvable = MCFunctionFactory | string;
export type Transformer = (input: string) => string