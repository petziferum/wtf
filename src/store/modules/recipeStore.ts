import Recipe, { recipeConverter } from "@/modules/features/rezeptbuch/types/Recipe";
import { Commit } from "@/store";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";
import router from "@/router";

export const RECIPE_STORE_MODULE = "recipeStoreModule";

const MUTATION_FETCH_RECIPES = "MUTATION_FETCH_RECIPES";
const MUTATION_INIT_RECIPES = "INIT_RECIPES";
const ACTION_FETCH_RECIPES = "ACTION_FETCH_RECIPES";
const GETTER_RECIPES = "GETTER_RECIPES";
const GET_EDITRECIPE = "GET_EDITRECIPE";
const CREATE_NEW_RECIPE = "CREATE_NEW_RECIPE";
const SAVE_RECIPE_TO_DB = "SAVE_RECIPE_TO_DB";
const GET_LOADING = "GET_LOADING";

export interface Content {
  recipes: Recipe[];
  editRecipe: Recipe | undefined;
  loading: boolean;
}
export const recipeStoreModule = {
  namespaced: true,
  state: {
    loading: false,
    recipes: [],
    editRecipe: undefined,
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

    ADD_EDIT_RECIPE(state: Content, payload: Recipe): void {
      state.editRecipe = payload;
    },
  },

  actions: {
    [ACTION_FETCH_RECIPES]({ commit }: Commit): void {
      commit("MUTATE_LOADING", true);
      RecipeServiceApi.getRecipes().then((foo) => {
        commit(MUTATION_INIT_RECIPES, foo);
        setTimeout(() => commit("MUTATE_LOADING", false), 1000);
      });
    },

    [CREATE_NEW_RECIPE](
      { commit }: Commit,
      editRecipe: Recipe
    ): Promise<Recipe | void> {
      commit("MUTATE_LOADING", true);
      console.log("save editRecipe", editRecipe);
      return RecipeServiceApi.createNewRecipe(editRecipe)
        .then((id) => {
          editRecipe.id = id;
          commit("ADD_EDIT_RECIPE", editRecipe);
          console.info("rezept angelegt: ", editRecipe);
          return editRecipe;
        })
        .then(() => {
          commit("MUTATE_LOADING", false)
          router.push("/add/"+editRecipe.id);
        });
    },

    [SAVE_RECIPE_TO_DB]({ commit }: Commit, newRecipe: Recipe): void {
      RecipeServiceApi.createNewRecipe(newRecipe).then((id) => {
        newRecipe.withId(id);
        console.log("id", id, "editRecipe", newRecipe);
        commit("ADD_EDIT_RECIPE", newRecipe);
        router.push("/add/" + id);
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
    GET_EDIT_RECIPE(state: Content): Recipe | undefined {
      return state.editRecipe;
    },
    GET_LOADING(state: Content): boolean {
      return state.loading;
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
export function getEditRecipe(): string {
  return toNamespaced(GET_EDITRECIPE);
}
export function getLoading(): string {
  return toNamespaced(GET_LOADING);
}
