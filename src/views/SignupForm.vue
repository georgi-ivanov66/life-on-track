<template>
  <base-layout pageTitle="Sign up for a new account" pageDefaultBackLink="/">
    <form
      class="ion-padding"
      @submit.prevent="submitForm(enteredEmail, enteredPassword)"
    >
      <ion-list>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" required v-model="enteredEmail"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" required v-model="enteredPassword">
          </ion-input>
        </ion-item>
      </ion-list>
      <ion-button
        style="margin: 20px"
        shape="round"
        type="submit"
        expand="full"
      >
        Log in
      </ion-button>
    </form>
  </base-layout>
</template>

<script>
import { IonList, IonItem, IonInput, IonLabel, IonButton } from "@ionic/vue";
export default {
  name: "SignupPage",
  components: {
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
  },
  data() {
    return {
      enteredEmail: "",
      enteredPassword: "",
    };
  },
  methods: {
    submitForm() {
      alert("Form submitted");
      this.enteredPassword = "";
      this.enteredEmail = "";
    },
  },
};
</script>

<style></style>
