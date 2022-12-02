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
    public recipeDescription?: RecipeStep[],
    public active?: boolean
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.imageSrc = imageSrc;
    this.description = description;
    this.type = type;
    this.ingredients = ingredients;
    this.recipeDescription = recipeDescription;
    this.active = active;
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

  withActive(value: boolean): Recipe {
    this.active = value;
    return this;
  }

  setActive(): void {
    this.active = true;
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

function ingredientsConverter(i)  {
  if (i) {
    return {
      nr: i.nr,
      name: i.name,
      menge: i.menge,
    };
  } else {
    return null;
  }
};

function descriptionConverter(d)  {
  if (d) {
    return {
      nr: d.nr,
      img: d.img,
      text: d.text,
    };
  } else {
    return null;
  }
};

export const recipeConverter = {
  toFirestore: (recipe) => {
    console.log("firestore converter gestartet", recipe);
    return {
      recipeName: recipe.recipeName,
      createdBy: recipe.createdBy,
      active: recipe.active,
      ingredients: ingredientsConverter(recipe.ingredients),
      recipeDescription: descriptionConverter(recipe.recipeDescription)
    };
  },
  fromFirestore: (snapshot, options) => {
    const recipe = snapshot.data(options);
    return new Recipe(
      snapshot.id,
      recipe.createdBy,
      recipe.imageSrc,
      recipe.description,
      recipe.recipeName,
      recipe.type,
      recipe.ingredients,
      recipe.recipeDescription,
      recipe.imageSrc
    );
  },
};
