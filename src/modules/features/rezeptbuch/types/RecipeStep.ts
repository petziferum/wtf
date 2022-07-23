export default class RecipeStep {
  constructor(public nr?: number, public img?: string, public text?: string) {
    this.nr = nr;
    this.img = img;
    this.text = text;
  }

  public static createEmtptyRecipeStep(): RecipeStep {
    return new RecipeStep();
  }

  withNr(value: number): RecipeStep {
    this.nr = value;
    return this;
  }

  withImg(value: string): RecipeStep {
    this.img = value;
    return this;
  }

  withtext(value: string): RecipeStep {
    this.text = value;
    return this;
  }
}
