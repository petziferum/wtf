import { ActionContext } from "vuex";
import { Rootstate } from "@/store";

export const USER_STORE_MODULE_NAME = "userStoreModuleName";
const INIT_USER_MUTATION = "MUTATION";
const INIT_USER_ACTION = "ACTION";
const USER_GETTER = "GETTER";
type Action = ActionContext<userStoreModuleStoreState, Rootstate>;

export interface userStoreModuleStoreState {
  prop: string;
}

export const userStoreStoreModule = {
  namespaced: true,
  state: {
    prop: "",
  } as userStoreModuleStoreState,
  mutations: {
    [INIT_USER_MUTATION](state: userStoreModuleStoreState, payload: string): void {
      state.prop = payload;
    },
  },
  actions: {
    [INIT_USER_ACTION]({ commit }: Action, payload): void {
      commit(INIT_USER_MUTATION, payload);
    },
  },
  getters: {
    [USER_GETTER]: (state): string => {
      return state.prop;
    },
  },
};
export default userStoreStoreModule;

function toNamespaced(namespace: string): string {
  return `USER_STORE_MODULE/${namespace}`;
}

export function initUser(): string {
  return toNamespaced(INIT_USER_ACTION);
}

export function getUser(): string {
  return toNamespaced(USER_GETTER);
}
