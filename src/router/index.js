import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Requests from "../views/Requests.vue";
import CreateRequest from "@/views/CreateRequest";
import History from "@/views/History";
import Profile from "@/views/Profile";
import UserApi from "@/api/userApi";

const userApi = new UserApi();

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authenticated: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authenticated: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      authenticated: false
    }
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
    meta: {
      authenticated: true
    }
  },
  {
    path: "/requests/create",
    name: "Create Request",
    component: CreateRequest,
    meta: {
      authenticated: true
    }
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      authenticated: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      authenticated: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticated)) {
    let currentUser = userApi.getCurrentUser();
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (currentUser === null || currentUser === undefined) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
