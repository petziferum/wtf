<template>
  <v-row justify="center">
    <v-col cols="12" md="3">
      <v-icon>mdi-loading mdi-spin</v-icon> Lade...
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class loader extends Vue {
  @Prop()
  loading: boolean;
}
</script>

<style scoped></style>
