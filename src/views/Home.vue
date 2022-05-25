<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="3">
        <v-toolbar-title> Home </v-toolbar-title>
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
export default class Home extends Vue {}
</script>
