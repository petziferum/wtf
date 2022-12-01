<template>
  <v-app>
    <app-bar />
    <app-header />
    <v-main style="padding: 0;">
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AppBar from "@/modules/structure/AppBar.vue";
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/modules/structure/AppHeader.vue";

@Component({ components: { AppHeader, AppBar } })
export default class App extends Vue {}
</script>
