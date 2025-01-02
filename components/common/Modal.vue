<script lang="ts" setup>
import globalModals, { type ModalsType } from "~/stores/globalModals";
import Button from "./Button.vue";
import type { LucideIcon } from "lucide-vue-next";

const props = defineProps<{
  modalId: ModalsType;
  buttonIcon: LucideIcon;
  label: string;
}>();

const modalElement = ref<HTMLDivElement | null>(null);
const isOnModal = ref(false);
const modalStore = globalModals[props.modalId]();

const closeDropdown = (event: MouseEvent) => {
  if (modalElement.value && !modalElement.value.contains(event.target as Node) && !isOnModal.value) {
    modalStore.onClose();
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

<template>
  <div>
    <Button
      @click="modalStore.onChangeModal"
      v-on:mouseenter="() => (isOnModal = true)"
      v-on:mouseleave="() => (isOnModal = false)"
    >
      <props.buttonIcon class="h-4 w-4" /> {{ props.label }}
    </Button>

    <div v-if="modalStore.$state.open" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full"
        ref="modalElement"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
