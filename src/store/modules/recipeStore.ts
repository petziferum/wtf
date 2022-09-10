import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import { Commit } from "@/store";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";

export const RECIPE_STORE_MODULE = "recipeStoreModule";

const MUTATION_FETCH_RECIPES = "MUTATION_FETCH_RECIPES";
const MUTATION_INIT_RECIPES = "INIT_RECIPES";
const ACTION_FETCH_RECIPES = "ACTION_FETCH_RECIPES";
const GETTER_RECIPES = "GETTER_RECIPES";
const GET_LOADING = "GET_LOADING";

export interface Content {
  recipes: Recipe[];
  loading: boolean;
}
export const recipeStoreModule = {
  namespaced: true,
  state: {
    loading: false,
    recipes: [],
  } as Content,
  mutations: {
    MUTATE_LOADING(state: Content, value: boolean): void {
      state.loading = value;
    },
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
      commit("MUTATE_LOADING", true);
      RecipeServiceApi.getRecipes().then((foo) => {
        commit(MUTATION_INIT_RECIPES, foo);
        setTimeout(()=>commit("MUTATE_LOADING", false), 3000);
      });
    },

    addRecipe({ commit }: Commit, recipeToAdd): void {
      console.log("add");
    },
  },
  getters: {
    GETTER_RECIPES(state: Content): Recipe[] {
      return state.recipes;
    },
    GET_LOADING(state: Content): boolean {
      return state.loading;
    }
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
export function getLoading(): string {
  return toNamespaced(GET_LOADING);
}
