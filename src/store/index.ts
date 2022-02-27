import { User } from "firebase/auth";
import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";

export interface State {
  currentUser: User | null;
}
// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    currentUser: null,
  },
  getters: {
    currentUserEmail(state) {
      return state.currentUser ? state.currentUser.email : null;
    },
  },
  mutations: {
    setCurrentUser(state: State, user: User) {
      state.currentUser = user;
    },
  },
  actions: {
    setCurrentUser(context, user: User) {
      //you'd store in backend and do async work here
      context.commit("setCurrentUser", user);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
