<template>
  <span> </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RezeptTitle extends Vue {
  @Prop({ default: "Rezept Name" })
  title: string;

  @Prop({ default: "Rezept Untertitel" })
  subtitle: string;
}
</script>

<style scoped></style>
