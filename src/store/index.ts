import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";

export interface State {
  currentUser: User | null;
  currentUserData: DocumentData | null;
}
// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    currentUser: null,
    currentUserData: null,
  },
  getters: {
    currentUserEmail(state) {
      return state.currentUser ? state.currentUser.email : null;
    },
    currentUserData(state) {
      return state.currentUserData ? state.currentUserData : null;
    },
  },
  mutations: {
    setCurrentUser(state: State, user: User) {
      state.currentUser = user;
    },
    setCurrentUserData(state: State, userData: DocumentData) {
      state.currentUserData = userData;
    },
  },
  actions: {
    setCurrentUser(context, user: User) {
      //you'd store in backend and do async work here
      context.commit("setCurrentUser", user);
    },
    setCurrentUserData(context, userData: DocumentData) {
      //you'd store in backend and do async work here
      context.commit("setCurrentUserData", userData);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
