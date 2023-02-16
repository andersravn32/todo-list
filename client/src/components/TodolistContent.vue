<script setup>
import useTasks from "../composables/useTasks";
import TodoItem from "./TodoItem.vue";

// Refresh tasks on initial load
const tasks = useTasks();
tasks.refresh();

</script>

<template>
  <div>
    <ul class="flex flex-col space-y-2" v-if="tasks.data.value.length">
      <li class="grid grid-cols-6 items-center font-black">
        <span class="col-span-2">Titel</span>
        <span class="col-span-1">Startdato</span>
        <span class="col-span-1">Deadline</span>
        <span class="col-span-1">Prioritet</span>
        <span class="col-span-1">Status</span>
      </li>
      <TodoItem
        v-for="(task, index) in tasks.data.value"
        :key="index"
        :data="task"
      />
    </ul>
    <div
      v-if="!tasks.data.value.length"
      class="flex items-center justify-center"
    >
      Fandt ingen to-do punkter
    </div>
  </div>
</template>
