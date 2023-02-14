<script setup>
import { ref } from "vue";
import useAccount from "../composables/useAccount";
import FormCreateTask from "./Forms/CreateTask.vue";
const account = useAccount();

const showCreateForm = ref(false);
</script>

<template>
  <div class="todolist-header">
    <h1 class="text-2xl">Velkommen {{ account.user.value.firstName }}</h1>
    <button @click="showCreateForm = !showCreateForm">Tilføj</button>
    <FormCreateTask
      v-if="showCreateForm"
      @close="showCreateForm = !showCreateForm"
    />
  </div>
</template>

<style>
.todolist-header {
  @apply flex justify-between items-center mb-4 pb-4 border-b-2 border-slate-300;
}
</style>
