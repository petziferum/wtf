<template>
  <v-container>
    <div>
      <v-btn @click="$router.push('/')">zurück</v-btn>
    </div>
    <v-row justify="space-around">
      <v-col cols="4">
        <div class="display-1">Rezept bearbeiten</div>
        <v-card>
          <v-card-title>{{ editRecipe.recipeName }}</v-card-title>
          <v-card-subtitle>ID: {{ rezeptId }}</v-card-subtitle>
          <v-card-text>
            <v-form ref="editrecipeform">
              <v-text-field
                label="Name"
                v-model="editRecipe.recipeName"
              ></v-text-field>
              <v-text-field
                label="createdBy"
                v-model="editRecipe.createdBy"
              ></v-text-field>
            </v-form>
          </v-card-text>
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
  rezeptId = this.$route.params.id;

  get editRecipe(): Recipe {
    return this.$store.getters["recipeStoreModule/GET_EDIT_RECIPE"];
  }

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
      console.info("Rezept hinzugefügt", answer);
    });
  }
}
</script>

<style scoped></style>
