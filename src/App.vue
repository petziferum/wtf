<template>
  <v-app>
    <app-bar />
    <v-main>
      <home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Home from "@/views/Home.vue";
import AppBar from "@/components/structure/AppBar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { Home, AppBar } })
export default class App extends Vue {}
</script>
