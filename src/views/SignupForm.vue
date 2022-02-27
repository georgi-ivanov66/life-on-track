<template>
  <base-layout pageTitle="Sign up for a new account">
    <template v-slot:actions-start>
      <ion-back-button default-href="/"></ion-back-button>
    </template>
    <form
      class="ion-padding"
      @submit.prevent="submitForm(enteredEmail, enteredPassword)"
    >
      <ion-list>
        <ion-item>
          <ion-label position="floating"
            ><ion-icon
              slot="end"
              :icon="icons.personOutline"
              class="input-icon"
            ></ion-icon
            >Name:</ion-label
          >
          <ion-input type="text" required v-model="enteredName"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"
            ><ion-icon slot="end" :icon="icons.mailOutline" class="input-icon">
            </ion-icon>
            Email:
          </ion-label>

          <ion-input type="email" required v-model="enteredEmail"> </ion-input>
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
        Sign Up
      </ion-button>
    </form>
  </base-layout>
</template>

<script>
import {
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonBackButton,
  IonIcon,
} from "@ionic/vue";
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  calendarClearOutline,
} from "ionicons/icons";
import { defineComponent } from "@vue/runtime-core";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  name: "SignupPage",
  components: {
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonBackButton,
    IonIcon,
  },
  data() {
    return {
      enteredEmail: "",
      enteredPassword: "",
      enteredName: "",
      icons: {
        personOutline,
        mailOutline,
        lockClosedOutline,
        calendarClearOutline,
      },
    };
  },
  methods: {
    async submitForm() {
      const auth = getAuth();
      createUserWithEmailAndPassword(
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
