import { Effect, EffectDuration, Entity } from "@datapackjs/core";
import { TargetSelector } from "@datapackjs/core/types";
import { ObjectiveType } from "@datapackjs/core/types/scoreboard";

export function summon(entity: Entity, x: Number, y: Number, z: Number, nbt: object) {
  return `summon minecraft:${entity} ${x} ${y} ${z} ${JSON.stringify(nbt)}`
}

export const effect = {
  give(selector: TargetSelector, effect: Effect, duration?: EffectDuration, amplifier?: number, hideParticles?: boolean) {
    return `effect give ${selector} minecraft:${effect} ${duration ?? ''} ${amplifier ?? ''} ${hideParticles ?? ''}`.trim()
  },
  clear(selector: TargetSelector, effect?: Effect) {
    return `effect clear ${selector} ${effect ?? ''}`.trim()
  }
}

export const scoreboard = {

  players: {
    add(selector: TargetSelector, objectiveName: string, score: number) {
      return `scoreboard players add ${selector} ${objectiveName} ${score}`.trim()
    }
  }

}