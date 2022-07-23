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
import RecipeForm from "@/modules/features/rezeptbuch/components/RecipeForm.vue"; // @ is an alias to /src

export enum Ingredient {
  ZUCKER = "Zucker",
  MEHL = "Mehl",
  HACKFLEISCH = "Hackfleisch",
  PASSIERTE_TOMATEN = "Passierte Tomaten",
  SPAGHETTI = "Spaghetti",
}

const IngredientToBeschreibung = new Map<string, string>([
  [Ingredient.HACKFLEISCH, "Hackfleisch"],
  [Ingredient.MEHL, "Mehl"],
  [Ingredient.ZUCKER, "Zucker"],
  [Ingredient.PASSIERTE_TOMATEN, "Passierte Tomaten"],
  [Ingredient.SPAGHETTI, "Spaghetti"],
]);

export const ingredientsAsRecord: Record<string, string>[] = Object.values(
  Ingredient
).map((key) => {
  return {
    key: key,
    value: IngredientToBeschreibung.get(key) as string,
  };
});

export interface Zutat {
  menge: string;
  zutat: string;
}

export interface Step {
  nr: number;
  description: string;
  image: string;
}

export interface Rezept {
  id: string;
  name: string;
  description: string;
  type: string;
  ingredients: Zutat[];
  steps: Step[];
}

@Component({
  components: {
    RecipeForm,
    Loader,
    RezeptView,
    HelloWorld,
  },
})
export default class Home extends Vue {
  rezept: Rezept | null = null;
  loading = false;
  itemList: Zutat[] = [];

  loadRezept(): void {
    this.loading = true;
    const r: Rezept = {
      id: "r129311fq3",
      type: "normal",
      name: "Schwurzföggbräthurz",
      description: "Ein guter Schwurzföggbräthurz hält jung!",
      ingredients: this.itemList,
      steps: [
        {
          nr: 1,
          description: "Den Mond anbellen",
          image: "http://bild.de/img.png",
        },
      ],
    };
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
