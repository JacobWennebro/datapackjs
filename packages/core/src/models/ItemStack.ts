import { Material } from "src/enums";

export class ItemStack {

  constructor(
    public type: Material,
    public count: number = 1
  ) { }

  public addComponent() { }

}