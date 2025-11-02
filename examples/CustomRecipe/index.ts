import { Datapack, ItemStack, Material, Recipe, RecipeType } from '@datapackjs/core'

const datapack = new Datapack(88, 'recipe_pack', 'This is an example of how to add custom recipes in Datapack.js');

const item = new ItemStack(Material.SPONGE)

const recipe = Recipe.define(item, RecipeType.CRAFTING_SHAPED, [
  [Material.GOLD_BLOCK, Material.GOLD_BLOCK, Material.GOLD_BLOCK],
  [null, Material.STICK, null],
  [null, Material.STICK, null]
]);