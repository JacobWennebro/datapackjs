import { Material, RecipeType } from "./enums";
import { ItemStack } from "./models/ItemStack";

export class Recipe {

  private constructor(
    private item: ItemStack,
    private type: RecipeType,
    private pattern: Array<Array<Material | null>>
  ) { }

  public static define(item: ItemStack, type: RecipeType, pattern: Array<Array<Material | null>>) {
    return new this(item, type, pattern)
  }

  private mapUniqueMaterialsToDigits(array: (Material | null)[][]): Record<Material, number> {
    return array.flat()
      .filter((item): item is Material => item !== null)
      .reduce((acc, item, index) => {
        if (!(item in acc) && index < 9) {
          acc[item] = index + 1;
        }
        return acc;
      }, {} as Record<Material, number>);
  }

  public toJSON() {
    const ids = this.mapUniqueMaterialsToDigits(this.pattern);

    const patternArray = this.pattern.map(row =>
      row.map(item => (item !== null ? ids[item] : ' ')).join('')
    );

    const key = Object.keys(ids).reduce((acc, material) => {
      acc[material] = `minecraft:${material}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      type: `minecraft:${this.type}`,
      pattern: patternArray,
      key,
      result: {
        id: this.item.type,
        count: this.item.count
      }
    }
  }

}