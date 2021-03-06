import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";

export default class Recipe {
  constructor(
    public id?: string,
    public createdBy?: string,
    public imageSrc?: string,
    public description?: string,
    public recipeName?: string,
    public type?: string,
    public ingredients?: Zutat[],
    public recipeDescription?: RecipeStep[]
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.imageSrc = imageSrc;
    this.description = description;
    this.type = type;
    this.ingredients = ingredients;
    this.recipeDescription = recipeDescription;
  }

  withId(value: string): Recipe {
    this.id = value;
    return this;
  }

  withRecipeName(value: string): Recipe {
    this.recipeName = value;
    return this;
  }

  withCreatedBy(value: string): Recipe {
    this.createdBy = value;
    return this;
  }

  withImageSrc(value: string): Recipe {
    this.imageSrc = value;
    return this;
  }

  withDescription(value: string): Recipe {
    this.description = value;
    return this;
  }

  withType(value: string): Recipe {
    this.type = value;
    return this;
  }
  withIngredients(value: Zutat[]): Recipe {
    this.ingredients = value;
    return this;
  }

  withRecipeDescription(value: RecipeStep[]): Recipe {
    this.recipeDescription = value;
    return this;
  }

  addIngredient(value: Zutat): Recipe {
    this.ingredients
      ? this.ingredients.push(value)
      : (this.ingredients = [value]);
    return this;
  }

  addStep(value: RecipeStep): Recipe {
    this.recipeDescription
      ? this.recipeDescription.push(value)
      : (this.recipeDescription = [value]);
    return this;
  }

  public static createEmtptyRecipe(): Recipe {
    return new Recipe();
  }
}
