<template>
  <base-layout pageTitle="Sign into your account" pageDefaultBackLink="/">
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
        Sign in
      </ion-button>
    </form>
  </base-layout>
</template>

<script lang="ts">
import { IonList, IonItem, IonInput, IonLabel, IonButton } from "@ionic/vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
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
    async submitForm() {
      const auth = getAuth();
      await signInWithEmailAndPassword(
        auth,
        this.enteredEmail,
        this.enteredPassword
      )
        .then(() => {
          // Signed in
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });

      this.enteredPassword = "";
      this.enteredEmail = "";
    },
  },
};
</script>

<style></style>
