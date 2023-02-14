<script setup>
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

const tasks = useTasks();
tasks.refresh();

const removeTask = async (id) => {
  await tasks.remove(id);
  await tasks.refresh();
};

const updateTask = async (id, title, due, done) => {
  await tasks.update(id, title, due, done);
  await tasks.refresh();
};
</script>

<template>
  <div>
    <ul v-if="tasks.data.value.length">
      <li class="grid grid-cols-6 items-center font-black">
        <span class="col-span-3">Titel</span>
        <span class="col-span-1">Deadline</span>
        <span class="col-span-1">Status</span>
        <span class="col-span-1">Handling(er)</span>
      </li>
      <li
        class="grid grid-cols-6 items-center space-y-2"
        v-for="(task, index) in tasks.data.value"
        :key="index"
      >
        <span class="col-span-3">{{ task.title }}</span>
        <span class="col-span-1">{{ getRelativeTime(task.due * 1000) }}</span>
        <span class="col-span-1" :class="{ 'text-red-500': !task.done }">{{
          task.done ? "Færdig" : "Ej færdig"
        }}</span>
        <span class="col-span-1 space-x-2"
          ><button
            class="px-3 py-1"
            @click="updateTask(task._id, task.title, task.due, true)"
          >
            Færdig</button
          ><button class="px-3 py-1 bg-red-500" @click="removeTask(task._id)">
            Slet
          </button>
        </span>
      </li>
    </ul>
    <div
      v-if="!tasks.data.value.length"
      class="flex items-center justify-center"
    >
      Fandt ingen to-do punkter
    </div>
  </div>
</template>
