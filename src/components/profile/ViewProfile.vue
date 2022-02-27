<template>
  <base-layout pageTitle="Profile">
    <template v-slot:actions-start>
      <ion-back-button default-href="/Dashboard"></ion-back-button>
    </template>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Personal Details</ion-card-subtitle>
        <ion-card-title style="font-size: 20px" >{{ currentUserEmail }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        Keep close to Nature's heart... and break clear away, once in a while,
        and climb a mountain or spend a week in the woods. Wash your spirit
        clean.
      </ion-card-content>
    </ion-card>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import { defineComponent } from "@vue/runtime-core";
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonBackButton,
} from "@ionic/vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    BaseLayout,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonBackButton,
  },
  computed: {
    currentUserEmail() {
      return this.$store.getters.currentUserEmail;
    },
  },
});
</script>

<style></style>
