<template>
  <base-layout pageTitle="Dashboard">
    <template v-slot:actions-start>
      <ion-button fill="clear" href="/Profile">
        <ion-icon slot="icon-only" :icon="personCircleOutline"></ion-icon>
      </ion-button>
    </template>
    <template v-slot:actions-end>
      <ion-button @click="signOutUser(currentUser)" fill="clear">
        <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
      </ion-button>
    </template>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Personal Details</ion-card-subtitle>
        <ion-card-title>{{ currentUserEmail }}</ion-card-title>
      </ion-card-header>
    </ion-card>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BaseLayout from "../base/BaseLayout.vue";
import {
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import { getAuth, User, signOut } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

export default defineComponent({
  name: "UserDashboard",
  components: {
    BaseLayout,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  },
  data() {
    return { logOutOutline, personCircleOutline };
  },
  computed: {
    currentUserEmail(): User {
      return this.$store.getters.currentUserEmail;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    async signOutUser(user: User) {
      if (user) {
        try {
          console.log("signing out " + this.currentUserEmail);
          await signOut(getAuth());
          this.$router.push("/");
          console.log("current user now ", this.currentUserEmail);
        } catch {
          (error: FirebaseError) => {
            // An error happened.
            console.error(error);
          };
        }
      }
    },
  },
});
</script>

<style></style>
