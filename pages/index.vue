<template>
  <div>
    <div class="h-screen w-screen flex bg-gradient-to-r from-orange-400 to-coral-600">
      <div
        class="m-auto bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300"
      >
        <div class="space-y-4">
          <h1 class="text-2xl font-bold text-center text-coral-500 bg-clip-text">What do you like today?</h1>

          <NuxtLink
            to="/habit-tracking"
            class="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          >
            Tracking My Habit
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
