import { Datapack, Effect, Entity } from "@datapackjs/core";
import { MCEventFunction } from "@datapackjs/events";
import { effect, scoreboard, summon } from '@datapackjs/commands'
import { join } from 'path'

const datapack = new Datapack(88, 'craft', 'My pack');

const onApplePickup = MCEventFunction.define('on-apple-pickup', 'minecraft.picked_up:minecraft.apple', [
  'say &aPicked up an apple'
]);

const onAppleDrop = MCEventFunction.define('on-apple-drop', 'minecraft.dropped:minecraft.apple', [
  'say Dropped an apple',

  onApplePickup, // Equivalent to 'function craft:on-apple-pickup'

  summon(Entity.LLAMA, 8, 4, 6, {}),

  effect.give('@s', Effect.JUMP_BOOST, 'infinite', 20, true),

  scoreboard.players.add('@a', 'hello', 3)
]);

datapack.addTransformationStep((fileContents) => {
  return fileContents.replaceAll('&', '§');
});

datapack.registerFunction(onApplePickup);
datapack.registerFunction(onAppleDrop);

datapack.build({ output: join(import.meta.dirname, './datapack.zip') })