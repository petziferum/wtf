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
                v-model="item"
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
import { ingredientsAsRecord, Rezept, Step, Zutat } from "@/views/Home.vue";

@Component
export default class RecipeForm extends Vue {
  @PropSync("value")
  recipe: Rezept;

  menge = "";
  step: Step = { nr: 0, description: "", image: "http://bild.com/img.png" };
  item = "";
  itemList: Zutat[] = [];
  rezept: Rezept | null = null;
  ingredients = ingredientsAsRecord;

  searchIngredient(): void {
    console.info("suche nach: ", this.item);
  }

  submitItem(): void {
    console.info("hinzufügen");
    if (this.item.length > 0) {
      const z: Zutat = { menge: this.menge, zutat: this.item };
      this.itemList.push(z);
      this.item = "";
      this.menge = "";
    }
  }

  addStep(): void {
    if (this.step.description.length > 0) {
      this.step.nr = this.rezept ? this.rezept.steps.length + 1 : 1;
      this.rezept?.steps.push(this.step);
      this.step = { nr: 0, description: "", image: "http://bild.com/img.png" };
    }
  }
}
</script>

<style scoped></style>
