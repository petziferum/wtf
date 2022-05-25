<template>
  <v-app>
    <app-bar />
    <v-main>
      <home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "@/views/Home";
import AppBar from "@/components/structure/AppBar";

export default {
  name: "App",

  components: {
    AppBar,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
