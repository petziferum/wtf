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
    Hallo&nbsp;
    <div v-if="user">{{ user.email }}</div>
    <div v-else>Error 404 <v-btn @click="login">login</v-btn></div>
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
import { getUser, loginUser, userStoreModule } from "@/store/modules/userStore.module";

@Component
export default class AppBar extends Vue {
  loading = false;

  login(): void {
    this.loading = true;
    const email = "petziferum@gmail.com";
    const pass = "testtest";
    this.$store.dispatch(loginUser());
  }

  get user(): User {
    return this.$store.getters[getUser()];
  }
}
</script>

<style scoped></style>
