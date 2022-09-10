<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="4">
        <div class="display-1">Rezept hinzufügen - {{ rezeptId }}</div>
        <div>
          <v-btn @click="addRecipe">Add</v-btn>
          <v-btn @click="getCollection">get</v-btn>
        </div>
        <v-card>
          <v-card-title>Rezepte Ansicht</v-card-title>
          <v-card-text>
            <v-list three-line>
              <template v-for="(item, index) in rezepte">
                <v-list-item :key="index">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.recipeName }} by
                      {{ item.createdBy }}</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >{{ item.id }}
                      {{ item.description }}</v-list-item-subtitle
                    >
                    <v-card>
                      <v-card-text
                        >{{ item.ingredients }}<br />{{
                          item.recipeDescription
                        }}
                      </v-card-text>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
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
