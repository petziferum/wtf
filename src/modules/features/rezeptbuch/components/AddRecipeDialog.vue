<template>
  <v-dialog v-model="isOpen" width="30%">
    <template v-slot:activator="{ on }">
      <v-btn
        style="z-index: 2; top: 9px; margin-right: 15px; float: right"
        elevation="4"
        color="orange"
        v-on="on"
        large
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title>Wie heißt das Gericht?</v-card-title>
      <v-form ref="createRecipeForm">
        <v-card-text>
          <v-text-field
            label="Name des Gerichts"
            :rules="filledRule"
            v-model="newRecipe.recipeName"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="red">abbrechen</v-btn>
          <v-btn text color="green" @click="createRecipe">anlegen</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";

@Component
export default class AddRecipeDialog extends Vue {
  isOpen = false;
  newRecipe = Recipe.createEmtptyRecipe();
  filledRule = [(v) => v != null || "Name muss ausgefüllt sein"];

  @Ref("createRecipeForm")
  createForm: HTMLFormElement;

  createRecipe(): void {
    if (this.createForm.validate()) {
      RecipeServiceApi.createNewRecipe(this.newRecipe).then((id) => {
        console.log("id", id);
        this.$router.push("/add/" + id);
      });
    }
  }
}
</script>

<style scoped></style>
