<script setup>
import { ref } from "vue";
import useTasks from "../composables/useTasks";

const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
function getRelativeTime(timestamp) {
  const rtf = new Intl.RelativeTimeFormat("da", {
    numeric: "auto",
  });
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / DAY_MILLISECONDS
  );

  return rtf.format(daysDifference, "day");
}
// Credit: https://www.js-howto.com/how-to-format-dates-with-intl-relativetimeformat/

// Import tasks through composable
const tasks = useTasks();

// Define component props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Controls if task is expanded or not
const expanded = ref(false);

// Component methods
const markAsSolved = async (task) => {
  await tasks.update(
    task._id,
    task.title,
    task.description,
    task.startDate,
    task.due,
    true,
    task.priority
  );
  await tasks.refresh();
};

const deleteTask = async (task) => {
  await tasks.remove(task._id);
  await tasks.refresh();
};
</script>

<template>
  <div class="task">
    <div class="task-header" @click="expanded = !expanded">
      <span class="col-span-2">{{ data.title }}</span>
      <span>{{ getRelativeTime(data.startDate * 1000) }}</span>
      <span>{{ getRelativeTime(data.due * 1000) }}</span>
      <span v-if="data.priority == 0" class="text-green-500"
        >Lav prioritet</span
      >
      <span v-if="data.priority == 1" class="text-orange-500"
        >Middel prioritet</span
      >
      <span v-if="data.priority == 2" class="text-red-500">Høj prioritet</span>
      <span>{{ data.done ? "Færdig" : "Ikke færdig" }}</span>
    </div>
    <div v-if="expanded" class="task-content">
      <div class="flex flex-col space-y-2">
        <h3>{{ data.title }}</h3>
        <p>{{ data.description }}</p>
      </div>

      <div class="flex items-center space-x-4">
        <button
          v-if="!data.done"
          @click="markAsSolved(data)"
          class="bg-green-500"
        >
          Marker som løst
        </button>
        <button>Rediger</button>
        <button @click="deleteTask(data)" class="bg-red-500">Slet</button>
      </div>
    </div>
  </div>
</template>

<style>
.task {
  @apply flex flex-col;
}

.task-header {
  @apply grid grid-cols-6 items-center cursor-pointer;
}

.task-content {
  @apply mt-2 pt-2 border-t-2 border-slate-300 flex flex-col space-y-4;
}
</style>
