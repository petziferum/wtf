import Vue from "vue";
import Vuex, { CommitOptions, Payload } from "vuex";
import recipeStoreModule from "@/store/modules/recipeStore";
import userStoreModule from "@/store/modules/userStore.module";

Vue.use(Vuex);

export interface Rootstate {
  loading: boolean;
}

export interface Commit {
  commit: CommitAction;
}
export interface CommitAction {
  (type: string, payload?: unknown, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions);
}

export default new Vuex.Store({
  state: {
    loading: false,
  } as Rootstate,
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    recipeStoreModule,
    userStoreModule,
  },
});
