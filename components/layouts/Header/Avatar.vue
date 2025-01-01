<template>
  <div class="relative">
    <div class="flex items-center space-x-1 cursor-pointer" @click="isAvatarDropdownOpen = !isAvatarDropdownOpen">
      <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
        <img src="/assets/images/default-avatar.webp" alt="default avatar" />
      </div>
      <svg
        class="w-4 h-4 text-gray-500"
        fill="none"
        :transform="isAvatarDropdownOpen ? 'rotate(180)' : 'rotate(0)'"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <div
      v-if="isAvatarDropdownOpen"
      class="fixed top-14 right-4 p-1 bg-white rounded-md shadow-md animate-fade-down duration-[10] ease-out"
    >
      <button class="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-100" @click="signOut($auth)">
        <LogOut class="w-5 h-5 text-gray-400" /> Sign Out
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-vue-next";
const isAvatarDropdownOpen = ref(false);

watch(isAvatarDropdownOpen, (val) => {
  console.log({ val });
});
</script>
