import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Add from "@/views/AddRecipeView.vue";
import UserDashboard from "@/modules/features/user/UserDashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add/:id",
    name: "AddRecipe",
    component: Add,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
