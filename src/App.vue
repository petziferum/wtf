<template>
  <v-app>
    <app-bar v-on:showdrawer="drawer = !drawer" />
    <app-header />
    <v-main class="bg px-0 mx-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Home from "@/views/Home.vue";
import AppBar from "@/modules/structure/AppBar.vue";
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/modules/structure/AppHeader.vue";

@Component({ components: { AppHeader, Home, AppBar } })
export default class App extends Vue {
  drawer = false;
}
</script>
