<script setup>
import { useRouter } from "vue-router";
import useAccount from "../composables/useAccount";
const router = useRouter();
const account = useAccount();

const signout = async () => {
  const response = await account.signout();
  if (response.message) {
    return router.push("/signin");
  }
};
</script>

<template>
  <div class="todolist-footer">
    <span class="font-bold"
      >{{ account.user.value.firstName }}
      {{ account.user.value.lastName }}</span
    >
    <span class="italic">ID: {{ account.user.value.uuid }}</span>
    <span class="italic">E-mail: {{ account.user.value.email }}</span>
    <span class="text-blue-500 cursor-pointer underline" @click="signout"
      >Log ud</span
    >
  </div>
</template>

<style>
.todolist-footer {
  @apply text-xs flex flex-col text-black/50 items-center justify-center mt-4 pt-4 border-t-2 border-slate-300;
}
</style>
