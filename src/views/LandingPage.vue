<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <h1>Ready to get your life on track?</h1>
        <div style="padding: 20px"></div>

        <div id="buttons-container">
          <ion-button router-link="/login" v-if="!userSignedIn"
            >Sign in</ion-button
          >
          <ion-button router-link="/signup" fill="outline" v-if="!userSignedIn"
            >Sign up</ion-button
          >
          <ion-button @click="signOutUser" fill="outline" v-if="userSignedIn"
            >Sign out</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { getAuth, User, signOut } from "firebase/auth";
export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  data() {
    return {
      auth: getAuth(),
    };
  },
  computed: {
    userSignedIn() {
      return !!this.$store.state.currentUser;
    },
  },
  methods: {
    async signOutUser(user: User) {
      if (user) {
        signOut(this.auth).catch((error) => {
            // An error happened.
            console.error(error);
          });
      }
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  transform: translateY(-50%);
}
#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
