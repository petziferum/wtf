<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home {{ loading }}</v-toolbar-title>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-row>
          <template v-if="!loading">
            <v-card width="100%" elevation="12">
              <v-card-title>{{ rezept.name }}</v-card-title>
              <v-card-subtitle> {{ rezept.id }}</v-card-subtitle>
              <v-row>
                <v-col cols="4">
                  <template v-for="(card, i) in rezept.ingredients">
                    <v-card
                      dense
                      width="100%"
                      class="pa-0 ma-0"
                      height="30"
                      :key="i"
                    >
                      <v-card-text class="pa-1 ma-0"
                        >{{ card.menge }} {{ card.zutat }}</v-card-text
                      >
                    </v-card>
                  </template>
                </v-col>
                <v-col cols="8">
                  <v-card-text>
                    {{ rezept.description }}
                  </v-card-text>
                  <v-row v-for="(step, i) in rezept.steps" :key="i">
                    <v-col cols="1">
                      {{ step.nr }}
                    </v-col>
                    <v-col cols="8">
                      <v-card-text>
                        {{ step.description }}
                      </v-card-text>
                    </v-col>
                    <v-col cols="3">{{ step.image }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </template>
          <template v-else> Lade... </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
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
                <v-text-field
                  dense
                  id="item"
                  label="Zutat"
                  hint="Mit Enter hinzufügen"
                  persistent-hint
                  outlined
                  v-model="item"
                ></v-text-field>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

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
  ingredients: Zutat[];
  steps: Step[];
}

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  item = "";
  menge = "";
  step: Step = { nr: 0, description: "", image: "http://bild.com/img.png" };
  itemList: Zutat[] = [];
  rezept: Rezept | null = null;
  loading = false;

  loadRezept(): void {
    this.loading = true;
    const r: Rezept = {
      id: "r1",
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

  beforeMount(): void {
    this.loadRezept();
  }
}
</script>
