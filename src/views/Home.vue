<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home </v-toolbar-title>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-row>
          <transition-group mout="out-in" name="group">
            <template v-for="card in itemList">
              <v-slide-y-transition :key="card" group="group">
                <v-col cols="3" style="border: 0px solid">
                  <v-card color="accent" width="100%" class="ma-0">
                    <v-card-text>{{ card }}</v-card-text>
                  </v-card>
                </v-col>
              </v-slide-y-transition>
            </template>
          </transition-group>
        </v-row>
        <v-row>
          <v-col>
            <template>
              <v-form ref="input" @submit.prevent="submitItem">
                <v-text-field
                  id="item"
                  label="Zutat"
                  hint="Mit Enter hinzufügen"
                  persistent-hint
                  outlined
                  v-model="item"
                ></v-text-field>
              </v-form>
            </template>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  item = "";
  itemList: string[] = [];

  submitItem(): void {
    if (this.item.length > 0) {
      this.itemList.push(this.item);
      this.item = "";
    }
  }
}
</script>
