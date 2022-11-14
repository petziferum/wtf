import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import { fireAuth } from "@/plugins/firebase";
import { loginUser } from "@/store/modules/userStore.module";

Vue.config.productionTip = false;

let app;
fireAuth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
      created() {
        this.$store.dispatch(loginUser(), user?.uid);
      },
    }).$mount("#app");
  }
});
