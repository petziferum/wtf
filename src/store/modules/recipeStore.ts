import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import { Ingredient } from "@/modules/features/rezeptbuch/types/Ingredients.type";
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";
import { Commit } from "@/store";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";

export const RECIPE_STORE_MODULE = "recipeStoreModule";

const MUTATION_FETCH_RECIPES = "MUTATION_FETCH_RECIPES";
const MUTATION_INIT_RECIPES = "INIT_RECIPES";
const ACTION_FETCH_RECIPES = "ACTION_FETCH_RECIPES";
const GETTER_RECIPES = "GETTER_RECIPES";

export interface Content {
  recipes: Recipe[];
}
export const recipeStoreModule = {
  namespaced: true,
  state: {
    recipes: [],
  } as Content,
  mutations: {
    [MUTATION_INIT_RECIPES](state: Content, payload: Recipe[]): void {
      state.recipes = payload;
    },

    [MUTATION_FETCH_RECIPES](state: Content, payload: Recipe): void {
      state.recipes.push(payload);
      console.log("added", payload, state.recipes);
    },
  },
  actions: {
    [ACTION_FETCH_RECIPES]({ commit }: Commit): void {
      RecipeServiceApi.getRecipes().then((foo) => (commit(MUTATION_INIT_RECIPES, foo)));
    },

    addRecipe({ commit }: Commit, recipeToAdd): void {
      console.log("add");
    },
  },
  getters: {
    GETTER_RECIPES(state: Content): Recipe[] {
      return state.recipes;
    },
  },
};

export default recipeStoreModule;

function toNamespaced(namespace: string): string {
  return `${RECIPE_STORE_MODULE}/${namespace}`;
}
export function initRecipes(): string {
  return toNamespaced(ACTION_FETCH_RECIPES);
}
export function getRecipes(): string {
  return toNamespaced(GETTER_RECIPES);
}
