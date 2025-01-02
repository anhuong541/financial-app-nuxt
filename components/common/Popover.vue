<template>
  <div class="relative rounded-full shadow-md">
    <div
      class="flex items-center space-x-1 cursor-pointer"
      @click="props.onOpen"
      v-on:mouseenter="() => (isOnbutton = true)"
      v-on:mouseleave="() => (isOnbutton = false)"
    >
      <slot />
    </div>
    <div ref="popoverElement" v-if="props.open" class="fixed top-14 right-4 p-1 bg-white rounded-md shadow-md">
      <button
        v-for="item in props.items"
        @click="item.action"
        class="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-100"
      >
        <component :is="item.icon" class="w-5 h-5" /> {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PopoverItems } from "~/types/common-type";

const props = defineProps<{
  items: PopoverItems[];
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}>();

const popoverElement = ref<HTMLDivElement | null>(null);
const isOnbutton = ref(false);

const closeDropdown = (event: MouseEvent) => {
  if (popoverElement.value && !popoverElement.value.contains(event.target as Node) && !isOnbutton.value) {
    props.onClose();
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
