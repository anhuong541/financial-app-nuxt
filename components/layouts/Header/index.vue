<template>
  <header class="relative h-16 flex items-center justify-between mx-auto">
    <!-- Left side -->
    <div class="flex items-center gap-2">
      <button class="p-2 bg-white shadow-md rounded-md">
        <div class="w-5 h-5 flex flex-col justify-center space-y-1">
          <span class="block w-5 h-0.5 bg-gray-600"></span>
          <span class="block w-5 h-0.5 bg-gray-600"></span>
          <span class="block w-5 h-0.5 bg-gray-600"></span>
        </div>
      </button>
      <div class="flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow-md cursor-pointer">
        <div class="w-5 h-5 bg-coral-500 rounded-sm"></div>
        <span class="text-sm font-medium">habittrackerapp.com</span>
        <!-- fake link -->
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Center logo -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 flex items-center">
      <div class="text-2xl font-bold flex items-center gap-1">
        <span class="text-coral-500">Habit Tracker</span>
        <span>App</span>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-1 bg-orange-50 px-3 py-1.5 rounded-full">
        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2c.944 0 1.71.764 1.71 1.708v.945c3.075.35 5.373 2.975 5.373 6.087a6.09 6.09 0 0 1-1.003 3.365l-1.162 1.67a3.426 3.426 0 0 0-.676 2.04v1.277c0 .944-.766 1.708-1.71 1.708h-5.064c-.944 0-1.71-.764-1.71-1.708v-1.277c0-.744-.243-1.466-.676-2.04l-1.162-1.67A6.09 6.09 0 0 1 4.917 10.74c0-3.112 2.298-5.737 5.373-6.087v-.945C10.29 2.764 11.056 2 12 2Z"
          />
        </svg>
        <span class="font-medium text-orange-600">2</span>
      </div>
      <Avatar />
    </div>
  </header>
</template>

<script lang="ts" setup>
import Avatar from "./Avatar.vue";
</script>
