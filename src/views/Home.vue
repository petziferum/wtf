<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home {{ loading }}</v-toolbar-title>
      </v-col>
    </v-row>

    <template>
      <loader v-if="loading" :loading="loading" />
      <rezept-view v-else v-model="rezept" />
    </template>

    <template>
      <recipe-form v-model="rezept" />
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/modules/HelloWorld.vue";
import RezeptView from "@/modules/features/rezeptbuch/RezeptView.vue";
import Loader from "@/modules/commons/loader.vue";
import RecipeForm from "@/modules/features/rezeptbuch/components/RecipeForm.vue";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat"; // @ is an alias to /src
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";

@Component({
  components: {
    RecipeForm,
    Loader,
    RezeptView,
    HelloWorld,
  },
})
export default class Home extends Vue {
  rezept: Recipe | null = null;
  loading = false;
  itemList: Zutat[] = [];

  loadRezept(): void {
    this.loading = true;
    const r: Recipe = Recipe.createEmtptyRecipe()
      .withId("r129311fq3")
      .withType("normal")
      .withRecipeName("Schwurzföggbrätwurtz")
      .withCreatedBy("Feinschmecker_Lars")
      .withDescription("Ein guter Schwurzföggbräthurz hält jung!")
      .withImageSrc("https://google.com");
    r.addIngredient(
      Zutat.createEmtptyZutat().withName("Rotze").withNr(23).withMenge("500g")
    );
    r.addStep(
      RecipeStep.createEmtptyRecipeStep()
        .withImg("bildSrc")
        .withNr(1)
        .withText("Den Herd aufdrehen")
    );

    setTimeout(() => {
      this.rezept = r;
      this.loading = false;
    }, 2000);
  }

  beforeMount(): void {
    this.loadRezept();
  }
}
</script>
