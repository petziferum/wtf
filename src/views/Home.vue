<template>
  <v-container fluid style="background-color: lightblue">
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title>Home</v-toolbar-title>
      </v-col>
      <v-col>
        <div style="position: relative; width: 100%; border: 0px solid">
          <add-recipe-dialog ref="addDialog" />
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6">
        loading: {{ loading }}<br />
        view: {{ view }} <v-btn small @click="switchoffAll">off</v-btn>
        <loader v-if="loading" :loading="loading" />

        <template v-else>
          <!--
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
          -->

          <v-lazy
            v-model="view[i]"
            :options="{
              threshold: 1,
            }"
            min-height="200"
            transition="fab-transition"
            v-for="(rezept, i) in recipes"
            :key="rezept.id"
          >
            <div>
              <v-btn @click="switchoff(i)">off</v-btn>
              <rezept-view :value="rezept" />
            </div>
          </v-lazy>
        </template>
      </v-col>
    </v-row>

    <template>
      <recipe-form v-model="editRecipe" />
    </template>
    <v-btn @click="fetch">fetch</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import HelloWorld from "@/modules/HelloWorld.vue";
import RezeptView from "@/modules/features/rezeptbuch/RezeptView.vue";
import Loader from "@/modules/commons/loader.vue";
import RecipeForm from "@/modules/features/rezeptbuch/components/RecipeForm.vue";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import {
  getLoading,
  getRecipes,
  initRecipes,
} from "@/store/modules/recipeStore";
import AddRecipeDialog from "@/modules/features/rezeptbuch/components/AddRecipeDialog.vue";

@Component({
  components: {
    AddRecipeDialog,
    RecipeForm,
    Loader,
    RezeptView,
    HelloWorld,
  },
})
export default class Home extends Vue {
  itemList: Zutat[] = [];
  editRecipe: Recipe = Recipe.createEmtptyRecipe();
  view: [boolean] = [false];

  @Ref("addDialog")
  dialog: AddRecipeDialog;

  get loading(): boolean {
    return this.$store.getters[getLoading()];
  }

  get recipes(): Recipe[] {
    return this.$store.getters[getRecipes()];
  }

  switchoff(nr: number): void {
    console.info("click off", nr);
    this.$set(this.view, nr, false);
  }

  switchoffAll(): void {
    for (const i in this.view) {
      console.info("value", this.view[i]);
      if (this.view[i]) {
        this.$set(this.view, i, false);
        console.info("new value", this.view[i]);
      }
    }
  }

  fetch(): void {
    this.$store.dispatch(initRecipes());
    if (this.recipes) {
      console.info("länge", this.recipes.length);
      for (const i in this.recipes) {
        this.view[i] = false;
      }
    }
  }

  loadRezepte(): void {
    this.$store.dispatch("recipeStore/initiateRecipes").then(() => {
      this.editRecipe = this.recipes[0];
    });
  }

  beforeMount(): void {
    this.fetch();
  }
}
</script>
