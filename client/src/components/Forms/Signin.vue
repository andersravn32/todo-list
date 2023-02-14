<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Import router
const router = useRouter();

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

  // Fetch accessToken, refreshToken and user data from server
  const { accessToken, refreshToken, user, error } = await fetch(
    "http://127.0.0.1:3000/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    }
  ).then((res) => res.json());

  // If an error occurred, return
  if (error) {
    // Set requestError to response from server
    requestError.value = error;
    return;
  }

  // Store response values in localStorage
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to index
  return router.push("/");
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
  @apply  w-full max-w-md;
}

#form-signin input{
  @apply py-1 px-3 border-slate-300 border-2 rounded outline-none;
}

#form-signin button{
  @apply bg-blue-500 text-white uppercase font-bold py-2 px-6;
}
</style>
