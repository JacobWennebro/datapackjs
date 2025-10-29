import { Entity } from "../enums";
import { Block } from "./block";
import { Item } from "./item";

export type ObjectiveType =
  ObjectiveTypeBroken |
  ObjectiveTypeCrafted |
  ObjectiveTypeCustom |
  ObjectiveTypeDropped |
  ObjectiveTypeKilled |
  ObjectiveTypeKilledBy |
  ObjectiveTypeKilledByTeam |
  ObjectiveTypePickedUp |
  ObjectiveTypeStandalone |
  ObjectiveTypeTeamKill |
  ObjectiveTypeUsed

type ObjectiveTypeStandalone =
  | 'air'
  | 'armor'
  | 'deathCount'
  | 'dummy'
  | 'food'
  | 'health'
  | 'level'
  | 'totalKillCount'
  | 'playerKillCount'
  | 'trigger'
  | 'xp'

type ObjectiveTypeKilledByTeam = `killedByTeam.${TeamColor}`;
type ObjectiveTypeTeamKill = `teamkill.${TeamColor}`;
type ObjectiveTypeBroken = `minecraft.broken:minecraft.${Block}`;
type ObjectiveTypeMined = `minecraft.mined:minecraft.${Block}`;
type ObjectiveTypeCrafted = `minecraft.crafted:minecraft.${Item}`;
type ObjectiveTypeDropped = `minecraft.dropped:minecraft.${Item}`;
type ObjectiveTypePickedUp = `minecraft.picked_up:minecraft.${Item}`;
type ObjectiveTypeUsed = `minecraft.used:minecraft.${Item}`;
type ObjectiveTypeKilled = `minecraft.killed:minecraft.${Entity}`;
type ObjectiveTypeKilledBy = `minecraft.killed_by:minecraft.${Entity}`;
type ObjectiveTypeCustom = `minecraft.custom:minecraft.${Custom}`;

type Custom =
  | 'animals_bred'
  | 'aviate_one_cm'
  | 'bell_ring'
  | 'boat_one_cm'
  | 'clean_armor'
  | 'clean_banner'
  | 'clean_shulker_box'
  | 'climb_one_cm'
  | 'crouch_one_cm'
  | 'damage_absorbed'
  | 'damage_blocked_by_shield'
  | 'damage_dealt'
  | 'damage_dealt_absorbed'
  | 'damage_dealt_resisted'
  | 'damage_resisted'
  | 'damage_taken'
  | 'deaths'
  | 'drop'
  | 'eat_cake_slice'
  | 'enchant_item'
  | 'fall_one_cm'
  | 'fill_cauldron'
  | 'fish_caught'
  | 'fly_one_cm'
  | 'happy_ghast_one_cm'
  | 'horse_one_cm'
  | 'inspect_dispenser'
  | 'inspect_dropper'
  | 'inspect_hopper'
  | 'interact_with_anvil'
  | 'interact_with_beacon'
  | 'interact_with_blast_furnace'
  | 'interact_with_brewingstand'
  | 'interact_with_campfire'
  | 'interact_with_cartography_table'
  | 'interact_with_crafting_table'
  | 'interact_with_furnace'
  | 'interact_with_grindstone'
  | 'interact_with_lectern'
  | 'intract_with_loom'
  | 'interact_with_smithing_table'
  | 'interact_with_smoker'
  | 'interact_with_stonecutter'
  | 'jump'
  | 'leave_game'
  | 'minecart_one_cm'
  | 'mob_kills'
  | 'open_barrel'
  | 'open_chest'
  | 'open_enderchest'
  | 'open_shulker_box'
  | 'pig_one_cm'
  | 'play_noteblock'
  | 'play_record'
  | 'play_time'
  | 'player_kills'
  | 'pot_flower'
  | 'raid_trigger'
  | 'raid_win'
  | 'sleep_in_bed'
  | 'sneak_time'
  | 'sprint_one_cm'
  | 'strider_one_cm'
  | 'swim_one_cm'
  | 'talked_to_villager'
  | 'target_hit'
  | 'time_since_death'
  | 'time_since_rest'
  | 'total_world_time'
  | 'traded_with_villager'
  | 'trigger_trapped_chest'
  | 'tune_noteblock'
  | 'use_cauldron'
  | 'walk_on_water_one_cm'
  | 'walk_one_cm'
  | 'walk_under_water_one_cm';

type TeamColor =
  | 'aqua'
  | 'black'
  | 'blue'
  | 'dark_aqua'
  | 'dark_blue'
  | 'dark_gray'
  | 'dark_green'
  | 'dark_purple'
  | 'dark_red'
  | 'gold'
  | 'gray'
  | 'green'
  | 'light_purple'
  | 'red'
  | 'white'
  | 'yellow';
