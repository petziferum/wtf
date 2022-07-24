<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home {{ loading }}</v-toolbar-title>
      </v-col>
    </v-row>

    <template>
      <loader v-if="loading" :loading="loading" />

      <template v-else v-for="rezept in recipes">
        <rezept-view :key="rezept.id" :value="rezept" />
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
    return this.$store.getters["recipeStore/getRezepte"];
  }

  get user(): User {
    return this.$store.getters["GET_USER"];
  }

  fetch(): void {
    this.$store.dispatch("recipeStore/fetchRecipes")
  }

  loadRezepte(): void {
    this.loading = true;
    this.$store.dispatch("recipeStore/initiateRecipes").then(() => {
      this.loading = false;
      this.editRecipe = this.recipes[0];
    });
  }

  beforeMount(): void {
    console.log("user gefunden", this.user);
    this.loadRezepte();
  }
}
</script>
