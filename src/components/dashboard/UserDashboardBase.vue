<template>
  <base-layout pageTitle="Dashboard" v-if="!loading">
    <template v-slot:actions-start>
      <ion-button fill="clear" router-link="/Profile">
        <ion-icon slot="icon-only" :icon="icons.personCircleOutline"></ion-icon>
      </ion-button>
    </template>
    <template v-slot:actions-end>
      <ion-button @click="signOutUser(currentUser)" fill="clear">
        <ion-icon slot="icon-only" :icon="icons.logOutOutline"></ion-icon>
      </ion-button>
    </template>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Personal Details</ion-card-subtitle>
        <ion-card-title style="font-size: 20px">{{
          currentUserData.name
        }}</ion-card-title>
      </ion-card-header>
    </ion-card>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Weight</ion-card-subtitle>
        <ion-card-content>
          <base-chart></base-chart>
        </ion-card-content>
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
  IonCardContent,
} from "@ionic/vue";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import { getAuth, User, signOut } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import BaseChart from "../base/BaseChart.vue"

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
    IonCardContent,
    BaseChart,
  },
  data() {
    return { icons: { logOutOutline, personCircleOutline }, loading: true };
  },
  computed: {
    currentUserEmail(): User {
      return this.$store.getters.currentUserEmail;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentUserData() {
      return this.$store.state.currentUserData;
    },
  },
  methods: {
    async signOutUser(user: User) {
      if (user) {
        try {
          await signOut(getAuth());
          this.$router.replace("/");
        } catch {
          (error: FirebaseError) => {
            // An error happened.
            console.error(error);
          };
        }
      }
    },
  },
  watch: {
    currentUserData() {
      if (this.currentUserData) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    },
  },
});
</script>

<style></style>
