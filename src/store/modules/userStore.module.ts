import { ActionContext } from "vuex";
import { Rootstate } from "@/store";
import User from "@/modules/features/user/types/User";
import UserServiceApi from "@/modules/features/user/UserServiceApi";

export const USER_STORE_MODULE = "userStoreModule";
const GET_USER_ACCOUNT_MUTATION = "GET_USER_ACCOUNT_MUTATION";
const GET_USER_ACCOUNT = "GET_USER_ACCOUT";
const LOGIN_USER_ACTION = "LOGIN_USER_ACTION";
const USER_GETTER = "GET_USER";
type Action = ActionContext<userStoreModuleState, Rootstate>;

export interface userStoreModuleState {
  prop: string;
  user: User | null;
}

export const userStoreModule = {
  namespaced: true,
  state: {
    prop: "",
    user: null,
  } as userStoreModuleState,
  mutations: {
    [GET_USER_ACCOUNT_MUTATION](
      state: userStoreModuleState,
      payload: User
    ): void {
      state.user = payload;
      console.info("user im State", payload);
    },
  },
  actions: {
    async [LOGIN_USER_ACTION]({ commit }: Action, user: string): Promise<void> {
      console.log("übergeben", user);
      let id = "";
      if(!user) {
        const id = await UserServiceApi.userLogin(
          "petziferum@gmail.com",
          "testtest"
        ).then((userId) => {
          return userId;
        });
      } else {
        id = user;
      }
        if (id) {
          const user = await UserServiceApi.getUserAccount(id).then((res) => {
            return res;
          });
          console.log("user account: ", user);
          commit(GET_USER_ACCOUNT_MUTATION, user);
        } else {
          console.log("Keine id!");
        }
    },

    [GET_USER_ACCOUNT]({ commit }: Action, user): void {
      commit(GET_USER_ACCOUNT_MUTATION, user);
    },
  },
  getters: {
    [USER_GETTER]: (state): string => {
      return state.user;
    },
  },
};
export default userStoreModule;

function toNamespaced(namespace: string): string {
  return `${USER_STORE_MODULE}/${namespace}`;
}

export function initUser(): string {
  return toNamespaced(GET_USER_ACCOUNT);
}

export function loginUser(): string {
  return toNamespaced(LOGIN_USER_ACTION);
}

export function getUser(): string {
  return toNamespaced(USER_GETTER);
}
