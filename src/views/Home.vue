<template>
  <v-container fluid style="background-color: lightslategrey">
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home</v-toolbar-title>
      </v-col>
    </v-row>

    <template>
      <loader v-if="loading" :loading="loading" />

      <template v-else>
        <v-expansion-panels>
          <v-expansion-panel v-for="rezept in recipes" :key="rezept.id">
            <v-expansion-panel-header>{{
              rezept.recipeName
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <rezept-view :value="rezept" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </template>

    <template>
      <recipe-form v-model="editRecipe" />
    </template>
    <v-btn @click="fetch">fetch</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/modules/HelloWorld.vue";
import RezeptView from "@/modules/features/rezeptbuch/RezeptView.vue";
import Loader from "@/modules/commons/loader.vue";
import RecipeForm from "@/modules/features/rezeptbuch/components/RecipeForm.vue";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import firebase from "firebase/compat";
import User = firebase.User;
import {
  getRecipes,
  initRecipes,
  RECIPE_STORE_MODULE,
} from "@/store/modules/recipeStore";

@Component({
  components: {
    RecipeForm,
    Loader,
    RezeptView,
    HelloWorld,
  },
})
export default class Home extends Vue {
  loading = false;
  itemList: Zutat[] = [];
  editRecipe: Recipe = Recipe.createEmtptyRecipe();

  get recipes(): Recipe[] {
    return this.$store.getters[getRecipes()];
  }

  fetch(): void {
    this.$store.dispatch(initRecipes());
  }

  loadRezepte(): void {
    this.loading = true;
    this.$store.dispatch("recipeStore/initiateRecipes").then(() => {
      this.loading = false;
      this.editRecipe = this.recipes[0];
    });
  }

  beforeMount(): void {
    this.fetch();
  }
}
</script>
