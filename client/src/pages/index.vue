<template>
  <section id="page-index">
    <div
      class="border-2 border-slate-300 p-4 rounded w-full max-w-md flex flex-col space-y-4 justify-center items-center text-center"
    >
      <h1 class="text-2xl">Log på</h1>
      <p>
        Log venligst på, eller opret en ny konto, før du kan benytte denne todo
        liste
      </p>
      <p class="flex items-center space-x-4">
        <router-link class="text-blue-500 underline" to="/signin"
          >Log på</router-link
        >
        <span>|</span>
        <router-link class="text-blue-500 underline" to="/signup"
          >Opret mig</router-link
        >
      </p>
    </div>
  </section>
</template>

<style>
#page-index {
  @apply min-h-screen flex flex-col items-center justify-center;
}
</style>
