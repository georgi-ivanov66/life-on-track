import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
/* Theme variables */
import "./theme/variables.css";

import BaseLayout from "./components/base/BaseLayout.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { store, key } from "./store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "life-on-track-f6abf.firebaseapp.com",
  projectId: "life-on-track-f6abf",
  storageBucket: "life-on-track-f6abf.appspot.com",
  messagingSenderId: "982545594718",
  appId: "1:982545594718:web:8ed376ea5f4a6810aef7cf",
  measurementId: "G-NM8M3J9YMT",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
const app = createApp(App).use(IonicVue).use(router).use(store, key);

app.component("base-layout", BaseLayout);

router.isReady().then(() => {
  app.mount("#app");

  getAuth().onAuthStateChanged((user) => {
    if (user) {
      store.state.currentUser = user;
    } else {
      store.state.currentUser = null;
    }
  });
});
