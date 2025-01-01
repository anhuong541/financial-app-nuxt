<template>
  <div class="relative rounded-full shadow-md">
    <div
      class="flex items-center space-x-1 cursor-pointer"
      @click="isAvatarDropdownOpen = !isAvatarDropdownOpen"
      v-on:mouseenter="() => (isOnbutton = true)"
      v-on:mouseleave="() => (isOnbutton = false)"
    >
      <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img src="/assets/images/default-avatar.webp" alt="default avatar" />
      </div>
    </div>
    <div ref="avatarDropdown" v-if="isAvatarDropdownOpen" class="fixed top-14 right-4 p-1 bg-white rounded-md shadow-md">
      <button class="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-100" @click="signOut($auth)">
        <LogOut class="w-5 h-5 text-gray-400" /> Sign Out
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogOut } from "lucide-vue-next";
import { signOut } from "firebase/auth";

const isAvatarDropdownOpen = ref(false);
const avatarDropdown = ref<HTMLDivElement | null>(null);
const isOnbutton = ref(false);

const closeDropdown = (event: MouseEvent) => {
  if (avatarDropdown.value && !avatarDropdown.value.contains(event.target as Node) && !isOnbutton.value) {
    isAvatarDropdownOpen.value = false;
  }
};

// Add and remove the event listener
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>
