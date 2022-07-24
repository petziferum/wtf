import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import { Ingredient } from "@/modules/features/rezeptbuch/types/Ingredients.type";
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";
import { Commit } from "@/store";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";

export interface Content {
  recipes: Recipe[];
}
export default {
  namespaced: true,
  state: {
    recipes: [],
  } as Content,
  mutations: {
    INIT_RECIPES(state: Content, payload: Recipe[]): void {
      state.recipes = payload;
    },

    ADD_RECIPE(state: Content, payload: Recipe): void {
      state.recipes.push(payload);
      console.log("added", payload, state.recipes);
    },
  },
  actions: {
    initiateRecipes({ commit }: Commit): void {
      console.log("initiateRecipes");
      const payload: Recipe[] = [];
      const r: Recipe = Recipe.createEmtptyRecipe()
        .withId("r129311fq3")
        .withType("normal")
        .withRecipeName("Schwurzföggbrätwurtz ausm VueX Laden")
        .withCreatedBy("Store Feinschmecker_Lars")
        .withDescription("Ein guter Schwurzföggbräthurz hält jung!")
        .withImageSrc("https://google.com");
      r.addIngredient(
        Zutat.createEmtptyZutat()
          .withName(Ingredient.MEHL)
          .withNr(23)
          .withMenge("500g")
      );
      r.addStep(
        RecipeStep.createEmtptyRecipeStep()
          .withImg("bildSrc")
          .withNr(1)
          .withText("Den Herd aufdrehen")
      );
      payload.push(r);
      commit("INIT_RECIPES", payload);
    },
    fetchRecipes({ commit }: Commit): void {
      console.log("fetchAktion");
      const rezepte = RecipeServiceApi.fetchRecipes();
      commit("INIT_RECIPES", rezepte);
    },

    addRecipe({ commit }: Commit, recipeToAdd): void {
      console.log("add");
    },
  },
  getters: {
    getRezepte(state: Content): Recipe[] {
      return state.recipes;
    },
  },
};
