import { Datapack } from "../datapack";
import { MCFunction } from "../mc-function";

export type MCFunctionFactory = (datapack: Datapack) => MCFunction;

export type CommandResolvable = MCFunctionFactory | string;
export type Transformer = (input: string) => string