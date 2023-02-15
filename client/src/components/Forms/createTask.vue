<script setup>
import { ref } from "vue";
import useTasks from "../../composables/useTasks";

const emit = defineEmits(["done", "close"]);
const tasks = useTasks();

const requestError = ref("");

// Loading state
const loading = ref(false);

// New task data
const newTask = ref({
  title: null,
  description: null,
  due: null,
  startDate: null,
  priority: null,
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
    newTask.value.description,
    Math.floor(new Date(newTask.value.startDate) / 1000),
    Math.floor(new Date(newTask.value.due) / 1000),
    newTask.value.priority.length ? newTask.value.priority : 0
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
      <div class="flex flex-col space-y-2">
        <label>Titel</label>
        <input
          v-model="newTask.title"
          type="text"
          placeholder="Indtast titel"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label>Beskrivelse</label>
        <textarea
          v-model="newTask.description"
          class="h-32 resize-none"
          placeholder="Indtast beskrivelse"
        ></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col space-y-2">
          <label>Startdato</label>
          <input v-model="newTask.startDate" type="datetime-local" />
        </div>
        <div class="flex flex-col space-y-2">
          <label>Deadline</label>
          <input v-model="newTask.due" type="datetime-local" />
        </div>
        <div class="flex flex-col space-y-2">
          <label>Prioritet</label>
          <select v-model="newTask.priority">
            <option disabled value="">Vælg prioritet</option>
            <option value="0">Lav prioritet</option>
            <option value="1">Middel prioritet</option>
            <option value="2">Høj prioritet</option>
          </select>
        </div>
      </div>
      <p v-if="requestError.length" class="text-red-500">{{ requestError }}</p>
      <button>Opret todo</button>
    </form>
  </div>
</template>

<style>
#form-create-task {
  @apply bg-zinc-100 w-full max-w-lg;
}
</style>
