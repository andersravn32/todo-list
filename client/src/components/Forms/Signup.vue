<script setup>
import { ref } from "vue";
import useAccount from "../../composables/useAccount";

// useAccount composable
const account = useAccount();

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

  // Update loading state
  loading.value = true;

  // Perform signup through useAccount composable
  const response = await account.signup(
    formData.value.firstName,
    formData.value.lastName,
    formData.value.email,
    formData.value.password
  );

  // If an error occurred, return
  if (response.error) {
    // Set requestError to response from server
    requestError.value = response.error;
    return;
  }

  // Update loading state
  loading.value = false;

  // Redirect to index
  return router.push("/app");
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
