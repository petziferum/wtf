import Vue from "vue";
import Vuex, { CommitOptions, Payload } from "vuex";
import recipeStoreModule from "@/store/modules/recipeStore";

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
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  getters: {
    GET_USER: state => {
      return state.user;
    }
  },
  modules: {
    recipeStoreModule,
  },
});
