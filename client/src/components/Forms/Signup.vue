<script setup>
import { ref } from "vue";

// Ref object for storing form data
const formData = ref({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
});

// Contains form loading state
const loading = ref(false);

// Response message
const requestError = ref("");

const signup = async () => {
  // If form has been submitted, and data is loading, return
  if (loading.value) {
    return;
  }

  // Fetch accessToken, refreshToken and user data from server
  const { accessToken, refreshToken, user, error } = await fetch(
    "http://127.0.0.1:3000/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    }
  ).then((res) => res.json());

  console.log(accessToken, refreshToken, user, error);

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
  <form id="form-signup" @submit.prevent="signup">
    <h1 class="text-xl">Opret konto</h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col space-y-2">
        <label>Fornavn</label>
        <input
          v-model="formData.firstName"
          type="text"
          placeholder="Indtast Fornavn"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label>Efternavn</label>
        <input
          v-model="formData.lastName"
          type="text"
          placeholder="Indtast Efternavn"
        />
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <label>E-mail</label>
      <input
        v-model="formData.email"
        type="email"
        placeholder="Indtast E-mail"
      />
    </div>
    <div class="flex flex-col space-y-2">
      <label>Password</label>
      <input
        v-model="formData.password"
        type="password"
        placeholder="Indtast Password"
      />
    </div>
    <p v-if="requestError.length" class="text-red-500">{{ requestError }}</p>
    <button class="bg-blue-500 text-white uppercase font-bold py-2 px-6">
      Opret konto
    </button>

    <p>
      Har du allerede en konto?
      <router-link class="text-blue-500 underline" to="/signin"
        >Log på</router-link
      >
    </p>
  </form>
</template>
