import { Ingredient } from "@/modules/features/rezeptbuch/types/Ingredients.type";

export default class Zutat {
  constructor(
    public nr?: number,
    public name?: Ingredient,
    public menge?: string
  ) {
    (this.nr = nr), (this.name = name), (this.menge = menge);
  }

  public static createEmtptyZutat(): Zutat {
    return new Zutat();
  }

  withNr(value: number): Zutat {
    this.nr = value;
    return this;
  }

  withName(value: Ingredient): Zutat {
    this.name = value;
    return this;
  }

  withMenge(value: string): Zutat {
    this.menge = value;
    return this;
  }
}
