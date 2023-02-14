<script setup>
import useAccount from "../composables/useAccount";
import TodolistHeader from "./TodolistHeader.vue";
import TodolistContent from "./TodolistContent.vue";
import TodolistFooter from "./TodolistFooter.vue";

// Import account data from composable
const account = useAccount();
</script>

<template>
  <div id="todolist" v-if="account.user.value">
    <TodolistHeader />
    <TodolistContent />
    <TodolistFooter />
  </div>
</template>

<style>
#todolist {
  @apply border-2 border-slate-300 p-4 w-full max-w-2xl rounded flex flex-col;
}
</style>
