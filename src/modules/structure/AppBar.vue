<template>
  <v-app-bar app color="secondary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="140"
      />
    </div>

    <v-spacer></v-spacer>
    Hallo {{ user.email }}
    <v-spacer />
    <v-btn href="https://recipes-petzi.web.app" target="_blank" text>
      <span class="mr-2">Food Tinder</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase/compat";
import User = firebase.User;

@Component
export default class AppBar extends Vue {

  get user(): User {
    return this.$store.getters["GET_USER"];
  }
}
</script>

<style scoped></style>
