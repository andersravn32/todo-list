<script setup>
import useAccount from "../composables/useAccount";
const account = useAccount();
</script>

<template>
  <div class="todolist-header">
    <h1 class="text-2xl">Velkommen {{ account.user.value.firstName }}</h1>
    <button>Tilføj</button>
  </div>
</template>

<style>
.todolist-header {
  @apply flex justify-between items-center mb-4 pb-4 border-b-2 border-slate-300;
}
</style>
