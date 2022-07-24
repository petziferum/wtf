<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>{{ rezept.recipeName }}</v-card-title>
        <v-card-subtitle> id: {{ rezept.id }} <v-spacer />Erschaffer: {{ rezept.createdBy }}</v-card-subtitle>

        <v-row>
          <v-col cols="4">
            <template v-for="(card, i) in rezept.ingredients">
              <v-card dense width="100%" class="pa-0 ma-0" height="30" :key="i">
                <v-card-text class="pa-1 ma-0"
                  >{{ card.menge }} {{ card.name }}</v-card-text
                >
              </v-card>
            </template>
          </v-col>
          <v-col cols="8">
            <v-card-text>
              {{ rezept.description }}<br>
            </v-card-text>
            Zubereitungsschritte:
            <v-row v-for="(step, i) in rezept.steps" :key="i">
              <v-col cols="1">
                {{ step.nr }}
              </v-col>
              <v-col cols="8">
                <v-card-text>
                  {{ step.text }}
                </v-card-text>
              </v-col>
              <v-col cols="3">{{ step.img }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import RezeptTitle from "@/modules/features/rezeptbuch/components/RezeptTitle.vue";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";
@Component({
  components: { RezeptTitle },
})
export default class RezeptView extends Vue {
  @PropSync("value",{ type: Recipe})
  rezept;
}
</script>

<style scoped></style>
