<template>
  <v-row no-gutters style="border-bottom: solid 5px white">
    <v-img
      :src="require('@/assets/textlogo.png')"
      class="logobanner"
      position="center"
      min-height="400px"
      max-height="500"
    >
      <v-row justify="center" class="searchBox" no-gutters>
        <v-col cols="11" md="6" class="searchForm">
          <v-form ref="searchForm" @submit.prevent="search">
            <v-text-field
              class="textfield"
              background-color="#ffeeca"
              filled
              rounded
              v-model="searchValue"
              id="search-item"
              label="Rezept suchen"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-img>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {

  searchValue = "";

  search() {
    console.info("Es wird nach", this.searchValue, "gesucht");
  }
}
</script>

<style scoped>
.logobanner {
  position: relative;
}
.searchBox {
  position: relative;
  margin: 10em;
  width: 100%;
  height: 100%;
}
.searchForm {
  position: absolute;
  bottom: 0;
}
.textfield {
  width: 100%;
}
</style>
