<template>
  <header class="relative h-16 flex items-center justify-between mx-auto">
    <!-- Left side -->
    <div class="flex items-center gap-2">
      <button class="p-2 bg-white shadow-md rounded-md">
        <Menu class="w-5 h-5" />
      </button>
      <div class="flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow-md cursor-pointer">
        <div class="w-5 h-5 bg-coral-500 rounded-sm" />
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
        <span class="text-coral-500">{{ appTitle[props.appType] }}</span>
        <span>App</span>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-4">
      <Avatar />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Menu } from "lucide-vue-next";
import Avatar from "./Avatar.vue";
import type { ProductivityType } from "~/types";

const props = defineProps<{ appType: ProductivityType }>();

const appTitle = ref<{ [key: string]: string }>({
  "habit-tracking": "Daily Progress",
  "financial-tracking": "Personal Finance Manager",
});
</script>
