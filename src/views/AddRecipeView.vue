<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="4">
        <div class="display-1">Rezept hinzufügen</div>
        <div>
          <v-btn @click="addRecipe">Add</v-btn>
          <v-btn @click="getCollection">get</v-btn>
        </div>
        <v-card>
          <v-card-title>Rezepte</v-card-title>
          <v-card-text v-for="rezept in rezepte" :key="rezept.id">{{
            rezept
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import recipeServiceApi from "@/store/modules/recipeServiceApi";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";

@Component
export default class AddRecipeView extends Vue {
  rezepte: Recipe[] = [];

  getCollection(): void {
    recipeServiceApi.getRecipes().then((recipeArray) => {
      this.rezepte = recipeArray;
    });
  }

  addRecipe(): void {
    const r = Recipe.createEmtptyRecipe()
      .withRecipeName("Fette Wurst")
      .withCreatedBy("petziferum")
      .withType("Abendessen")
      .withIngredients([
        Zutat.createEmtptyZutat().withMenge("100g").withName("Mehl").withNr(1),
      ])
      .withRecipeDescription([
        RecipeStep.createEmtptyRecipeStep()
          .withText("blablabla irgendwas mit Zucker")
          .withNr(1)
          .withImg(
            "https://firebasestorage.googleapis.com/v0/b/recipes-petzi.appspot.com/o/recipes%2F4WfY2bCkSW08xcfp3OCD%2Fstep_1.png?alt=media&token=30e38a22-f116-4647-bb37-57411b32ce3a"
          ),
      ]);
    recipeServiceApi.saveNewRecipe(r).then((answer) => {
      console.log("answer", answer);
    });
  }
}
</script>

<style scoped></style>
