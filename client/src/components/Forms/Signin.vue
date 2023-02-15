<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import useAccount from "../../composables/useAccount";

// Import router
const router = useRouter();

// Import account data store
const account = useAccount();

// Ref object for storing form data
const formData = ref({
  email: null,
  password: null,
});

// Contains form loading state
const loading = ref(false);

// Response message
const requestError = ref("");

// Signin method
const signin = async () => {
  // If form has been submitted, and data is loading, return
  if (loading.value) {
    return;
  }

  // Update loading state
  loading.value = true;

  // Request signin through composable
  const response = await account.signin(
    formData.value.email,
    formData.value.password
  );
  if (response.error) {
    return (requestError.value = response.error);
  }

  // Update loading state
  loading.value = false;

  // Redirect back to index
  return router.push("/app");
};
</script>

<template>
  <form id="form-signin" @submit.prevent="signin">
    <h1 class="text-xl">Log på</h1>
    <div class="flex flex-col space-y-2">
      <label>E-mail</label>
      <input
        v-model="formData.email"
        type="email"
        placeholder="Indtast e-mail"
      />
    </div>
    <div class="flex flex-col space-y-2">
      <label>Password</label>
      <input
        v-model="formData.password"
        type="password"
        placeholder="Indtast password"
      />
    </div>
    <p v-if="requestError.length" class="text-red-500">{{ requestError }}</p>
    <button class="bg-blue-500 text-white uppercase font-bold py-2 px-6">
      Log på
    </button>
    <p>
      Har du ingen konto?
      <router-link class="text-blue-500 underline" to="/signup"
        >Opret mig</router-link
      >
    </p>
  </form>
</template>

<style>
#form-signin {
  @apply w-full max-w-md;
}

#form-signin input {
  @apply py-1 px-3 border-slate-300 border-2 rounded outline-none;
}

#form-signin button {
  @apply bg-blue-500 text-white uppercase font-bold py-2 px-6;
}
</style>
