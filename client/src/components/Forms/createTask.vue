<script setup>
import { ref, defineEmits } from "vue";
import useAccount from "../../composables/useAccount";

const emit = defineEmits(["done"]);

// Import account data from composable
const account = useAccount();

// Loading state
const loading = ref(false);

// New task data
const newTask = ref({
  title: null,
  due: null,
});

const createTask = async () => {
  // Loading method guard
  if (loading.value) {
    return;
  }

  // Update loading state
  loading.value = true;

  // Request to create new task
  const response = await fetch("http://127.0.0.1:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: account.accessToken.value,
    },
    body: JSON.stringify({
      title: newTask.value.title,
      due: Math.floor(new Date(newTask.value.due) / 1000),
    }),
  }).then((res) => res.json());

  // Update loading state
  loading.value = false;

  // Reset form input
  newTask.value.due = null;
  newTask.value.title = null;

  // Emit done event, along with response object
  emit("done", response)
};
</script>

<template>
  <form id="form-create-task" @submit.prevent="createTask">
    <h2>Opret todo</h2>
    <input v-model="newTask.title" type="text" placeholder="Indtast titel" />
    <input v-model="newTask.due" type="datetime-local" />
    <button>Opret todo</button>
  </form>
</template>
