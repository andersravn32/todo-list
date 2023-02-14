<script setup>
import useTasks from "../composables/useTasks";

const tasks = useTasks();
tasks.refresh();
</script>

<template>
  <div>
    <ul v-if="tasks.data.value.length">
      <li v-for="(task, index) in tasks.data.value" :key="index">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>
