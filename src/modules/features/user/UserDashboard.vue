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
      <v-col cols="10">
        <v-card>
          <v-card-title
            >User Rezepte
            <v-btn @click="getUserRecipe">fetch</v-btn></v-card-title
          >
          <v-card-text v-for="r in editRecipe" :key="r.id">
            <v-btn @click="updateRecipe(r)">update</v-btn
            ><v-btn @click="overwrite(r)">overwrite</v-btn>{{ r }}</v-card-text
          >
        </v-card>
      </v-col>
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
import Recipe, { recipeConverter } from "../rezeptbuch/types/Recipe";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
import RecipeServiceApi from "@/store/modules/recipeServiceApi";

@Component({
  components: {
    AddRecipeDialog,
  },
})
export default class UserDashboard extends Vue {
  editRecipe: DocumentData[] = [];

  async getUserRecipe(): Promise<void> {
    const q = query(
      collection(db, "test"),
      where("createdBy", "==", this.user.id)
    ).withConverter(recipeConverter);

    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      if (doc.exists()) {
        // Convert to City object
        const r = doc.data();
        // Use a City instance method
        this.editRecipe.push(r);
      } else {
        console.log("No such document!");
      }
    });
  }

  get user(): User {
    return this.$store.getters[getUser()];
  }

  updateRecipe(recipe: Recipe): void {
    this.editRecipe = [];
    RecipeServiceApi.updateEditRecipe(recipe).then(() => this.getUserRecipe());
  }

  overwrite(r: Recipe): void {
    //Todo: hier weiter machen!
    const newR = Recipe.createEmtptyRecipe()
      .withId(r.id!)
      .withCreatedBy(this.user.id)
      .withActive(true)
      .withRecipeName("Kacke");
    RecipeServiceApi.overwriteRecipe(newR).then(() => this.getUserRecipe());
  }
}
</script>

<style scoped>
.userCard {
  margin-top: 120px;
}
</style>
