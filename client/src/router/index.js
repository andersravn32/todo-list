import { createRouter, createWebHistory } from "vue-router";
import useAccount from "../composables/useAccount";

// Refresh account before initial page load
const account = useAccount()
if (account.refreshToken.value) {
  await account.refresh();
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/signin",
      component: () => import("../pages/signin.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/signup",
      component: () => import("../pages/signup.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/app",
      component: () => import("../pages/app.vue"),
      meta: {
        auth: true
      }
    }
  ],
});

router.beforeEach((to) => {
  if (to.meta.auth && !account.user.value){
    return router.push("/signin")
  }

  return true;
})

export default router;
