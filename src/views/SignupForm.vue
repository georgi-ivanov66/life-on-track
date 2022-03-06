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
          <ion-input
            type="text"
            required
            v-model="enteredName"
            @ionFocus="clearErrors"
          >
          </ion-input>
        </ion-item>
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
      <ion-toast
        v-if="errorThrown"
        animated
        header="Could not sign you up"
        :message="errorMessage"
        color="danger"
        position="top"
        :icon="icons.alertOutline"
      ></ion-toast>
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  AuthError,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
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
    IonToast,
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
        alertOutline,
      },
      errorThrown: false,
      errorMessage: "",
      errors: [
        {
          code: "auth/email-already-in-use",
          message: "A user already exists with the provided email.",
        },
        {
          code: "auth/weak-password",
          message: "Your password does not meet the requirements",
        },
      ],
    };
  },
  methods: {
    async submitForm() {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        this.enteredEmail,
        this.enteredPassword
      )
        .then((value) => {
          // Signed in
          this.addUserToFirestore(value.user);
          this.$router.push("/Dashboard");
        })
        .catch((error: AuthError) => {
          const errorMatch = this.errors.find((e) => e.code === error.code);
          this.errorThrown = true;
          this.errorMessage = errorMatch
            ? errorMatch.message
            : "An error has occurred, please try again";
        });
      this.enteredPassword = "";
      this.enteredEmail = "";
      this.enteredName = "";
    },

    async addUserToFirestore(user: User) {
      try {
        const db = getFirestore();
        await setDoc(doc(db, "users", user.uid), {
          name: this.enteredName,
          email: user.email,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
