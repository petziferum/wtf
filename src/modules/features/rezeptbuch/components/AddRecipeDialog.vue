<template>
  <v-dialog v-model="isOpen">
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
      <v-card-title>Möchtest du ein neues Rezept erstellen?</v-card-title>
      <template v-if="user != null">
      <v-card-subtitle>{{ user.id }}</v-card-subtitle>
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
          <v-btn text color="red" @click="cancel">abbrechen</v-btn>
          <v-btn text color="green" @click="createRecipe">weiter</v-btn>
        </v-card-actions>
      </v-form>
      </template>
      <template v-else>
        lade...
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
import { getEditRecipe } from "@/store/modules/recipeStore";
import { getUser } from "@/store/modules/userStore.module";
import User from "@/modules/features/user/types/User";

@Component
export default class AddRecipeDialog extends Vue {
  isOpen = false;
  newRecipe = Recipe.createEmtptyRecipe()
    .withActive(false);
  filledRule = [(v) => v != null || "Name muss ausgefüllt sein"];

  @Ref("createRecipeForm")
  createForm: HTMLFormElement;

  get user(): User {
    return this.$store.getters[getUser()];
  }

  createRecipe(): void {
    if (this.createForm.validate()) {
      this.$store.dispatch(
        "recipeStoreModule/CREATE_NEW_RECIPE",
        this.newRecipe
      );
    }
  }

  cancel(): void {
    this.newRecipe = Recipe.createEmtptyRecipe();
    this.isOpen = false;
  }

  beforeMount(): void {
    console.log("this.user", this.user);
    setTimeout(() => {
      if (this.user != null) {
        console.info("user vorhanden", this.user.id)
        this.newRecipe = Recipe.createEmtptyRecipe()
          .withCreatedBy(this.user.id)
          .withRecipeName("leer")
          .withActive(false);
      } else {
        console.log("kein User")
      }
    }, 1500)
  }
}
</script>

<style scoped></style>
