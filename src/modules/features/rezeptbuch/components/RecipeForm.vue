<template>
  <v-row justify="center" class="mt-12" style="border-top: 3px solid grey">
    <v-col cols="4">
      <template>
        <v-form ref="input" @submit.prevent="submitItem">
          <v-row>
            <v-col cols="3">
              <v-text-field
                dense
                id="menge"
                label="Menge"
                outlined
                v-model="menge"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-autocomplete
                dense
                id="item"
                label="Zutat"
                hint="Mit Enter hinzufügen"
                persistent-hint
                outlined
                @input="searchIngredient"
                v-model="zutatName"
                item-text="value"
                :items="ingredients"
              ></v-autocomplete>
            </v-col>
            <v-col cols="1">
              <v-btn type="submit" height="60%" outlined>hinzufügen</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </template>
      <template>
        <v-form ref="stepInput" @submit.prevent="addStep">
          <v-row>
            <v-col cols="11">
              <v-text-field
                dense
                id="nr"
                label="Beschreibung"
                outlined
                v-model="step.description"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn type="submit" height="60%" outlined>hinzufügen</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import RecipeStep from "@/modules/features/rezeptbuch/types/RecipeStep";
import Zutat from "@/modules/features/rezeptbuch/types/Zutat";
import {
  Ingredient,
  ingredientsAsRecord,
} from "@/modules/features/rezeptbuch/types/Ingredients.type";

@Component
export default class RecipeForm extends Vue {
  @PropSync("value")
  recipe: Recipe;

  menge = "";
  step: RecipeStep = RecipeStep.createEmtptyRecipeStep()
    .withNr(0)
    .withText("")
    .withImg("http://bild.com/img.png");
  zutatName: Ingredient = Ingredient.MEHL;
  itemList: Zutat[] = [];
  rezept: Recipe | null = null;
  ingredients = ingredientsAsRecord;

  searchIngredient(): void {
    console.info("suche nach: ", this.zutatName);
  }

  submitItem(): void {
    console.info("hinzufügen");
    if (this.zutatName.length > 0) {
      const z: Zutat = Zutat.createEmtptyZutat()
        .withMenge(this.menge)
        .withName(this.zutatName);

      this.itemList.push(z);
      this.zutatName = Ingredient.MEHL;
      this.menge = "";
    }
  }

  addStep(): void {
    if (this.step.text!.length > 0) {
      this.step.nr = this.rezept
        ? this.rezept.recipeDescription!.length + 1
        : 1;
      this.rezept
        ? this.rezept.recipeDescription!.push(this.step)
        : (this.rezept!.recipeDescription! = [
            RecipeStep.createEmtptyRecipeStep(),
          ]);
      this.step = RecipeStep.createEmtptyRecipeStep()
        .withNr(0)
        .withText("")
        .withImg("http://bild.com/img.png");
    }
  }
}
</script>

<style scoped></style>
