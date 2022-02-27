import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/LoginForm.vue";
import SignupPage from "../views/SignupForm.vue";
import ProfilePage from "../components/profile/ViewProfile.vue";
import UserDashboard from "../components/dashboard/UserDashboardBase.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/Profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: UserDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
