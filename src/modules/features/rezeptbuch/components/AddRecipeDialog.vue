<template>
  <v-dialog v-model="isOpen" width="30%">
    <template v-slot:activator="{on}">
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
      dialog {{ isOpen }}
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Recipe from "@/modules/features/rezeptbuch/types/Recipe";

@Component
export default class AddRecipeDialog extends Vue {
  isOpen = false;
  newRecipe = Recipe.createEmtptyRecipe()
}
</script>

<style scoped></style>
