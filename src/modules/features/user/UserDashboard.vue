<template>
<v-container fluid>
  <v-app-bar width="100%" absolute>
    <v-toolbar-items><v-btn text to="/">zurück</v-btn></v-toolbar-items>
    <v-toolbar-title>Benutzer</v-toolbar-title>
    <v-toolbar-items><v-btn text to="/add/1">edit</v-btn></v-toolbar-items>
  </v-app-bar>
  <v-row>
    <v-col cols="12">
      <v-card class="userCard">
        <v-card-text>
          <template v-for="(value, key) in user">
            <div :key="key">
              <div class="flex">{{ key }}: {{ value }}</div>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div style="position: relative; width: 100%; border: 0px solid">
        <add-recipe-dialog ref="addDialog" />
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getUser } from "@/store/modules/userStore.module";
import User from "@/modules/features/user/types/User";
import AddRecipeDialog from "@/modules/features/rezeptbuch/components/AddRecipeDialog.vue";

@Component({
  components: {
    AddRecipeDialog
  }
})
export default class UserDashboard extends Vue {

  get user(): User {
    return this.$store.getters[getUser()]
  }
}
</script>

<style scoped>
.userCard {
  margin-top: 120px;
}
</style>
