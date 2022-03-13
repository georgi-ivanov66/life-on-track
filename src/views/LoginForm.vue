<template>
  <base-layout pageTitle="Sign in to your account">
    <template v-slot:actions-start
      ><ion-back-button default-href="/"></ion-back-button
    ></template>
    <form
      class="ion-padding"
      @submit.prevent="submitForm(enteredEmail, enteredPassword)"
    >
      <ion-list>
        <ion-item>
          <ion-label position="floating"
            ><ion-icon slot="end" :icon="icons.mailOutline" class="input-icon">
            </ion-icon>
            Email:
          </ion-label>

          <ion-input
            type="email"
            required
            v-model="enteredEmail"
            @ionFocus="clearErrors"
          >
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">
            <ion-icon
              slot="end"
              :icon="icons.lockClosedOutline"
              class="input-icon"
            >
            </ion-icon
            >Password:</ion-label
          >
          <ion-input
            type="password"
            required
            v-model="enteredPassword"
            @ionFocus="clearErrors"
          >
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
      <ion-toast
        v-if="errorThrown"
        animated
        header="Could not sign you up"
        :message="errorMessage"
        color="danger"
        position="top"
        :icon="icons.alertOutline"
      ></ion-toast>
    </form>
  </base-layout>
</template>

<script lang="ts">
import {
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonBackButton,
  IonIcon,
  IonToast,
  toastController,
} from "@ionic/vue";
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  alertOutline,
} from "ionicons/icons";
import { defineComponent } from "@vue/runtime-core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonBackButton,
    IonIcon,
    IonToast,
  },
  data() {
    return {
      enteredEmail: "",
      enteredPassword: "",
      icons: {
        personOutline,
        mailOutline,
        lockClosedOutline,
        alertOutline,
      },
      errorThrown: false,
      errorMessage: "",
      errors: [
        {
          code: "auth/wrong-password",
          message: "The password you have entered is incorrect",
        },
        {
          code: "auth/user-not-found",
          message: "No user exists with these credentials",
        },
      ],
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
          this.$router.push("/Dashboard");
        })
        .catch((error) => {
          const errorMatch = this.errors.find((e) => e.code === error.code);
          this.errorThrown = true;
          this.errorMessage = errorMatch
            ? errorMatch.message
            : "An error has occurred, please try again";
          if (error.code !== "auth/wrong-password") {
            this.enteredEmail = "";
          }
        });
      // temporary solution to email staying in input when you logout
      this.enteredEmail = "";
      this.enteredPassword = "";
    },
    async clearErrors() {
      const toast = await toastController.getTop();
      if (toast) {
        await toastController.dismiss();
      }
      this.errorThrown = false;
      this.errorMessage = "";
    },
  },
});
</script>

<style scoped>
ion-label {
  display: flex !important;
  align-items: center;
}

ion-label ion-icon {
  height: 100%;
  margin-right: 5px;
}
</style>
