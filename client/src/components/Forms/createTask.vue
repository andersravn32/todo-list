<script setup>
import { ref, defineEmits } from "vue";
import useTasks from "../../composables/useTasks";

const emit = defineEmits(["done", "close"]);
const tasks = useTasks();

const requestError = ref("");

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

  // Create task through composable
  const response = await tasks.create(
    newTask.value.title,
    Math.floor(new Date(newTask.value.due) / 1000)
  );

  // If an error occurred, set local value to response error
  if (response.error) {
    loading.value = false;
    return (requestError.value = response.error);
  }

  // Update loading state
  loading.value = false;

  // Reset form input
  newTask.value.due = null;
  newTask.value.title = null;

  // Emit done event, along with response object
  emit("close");
};

const handleOverlay = (e) => {
  if (e.target.className == "overlay") {
    return emit("close");
  }
};
</script>

<template>
  <div class="overlay" @click="handleOverlay">
    <form id="form-create-task" @submit.prevent="createTask">
      <h2 class="text-xl">Opret todo</h2>
      <input v-model="newTask.title" type="text" placeholder="Indtast titel" />
      <input v-model="newTask.due" type="datetime-local" />
      <p v-if="requestError.length" class="text-red-500">{{ requestError }}</p>
      <button>Opret todo</button>
    </form>
  </div>
</template>

<style>
#form-create-task {
  @apply bg-zinc-100 w-full max-w-md;
}
</style>
