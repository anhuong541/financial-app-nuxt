<script lang="ts" setup>
import globalModals from "~/stores/globalModals";

const props = defineProps<{
  modalId: keyof typeof globalModals;
  title: string;
}>();

const modalElement = ref<HTMLDivElement | null>(null);
const isOnModal = ref(false);
const modalStore = globalModals[props.modalId]();
</script>

<template>
  <div>
    <slot name="trigger" />

    <div
      v-if="modalStore.$state.open"
      @click="!isOnModal && modalStore.onClose()"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <form
        v-on:mouseenter="() => (isOnModal = true)"
        v-on:mouseleave="() => (isOnModal = false)"
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-8 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg md:w-full"
        ref="modalElement"
      >
        <div class="flex flex-col space-y-2 text-center sm:text-left">
          <h2 class="text-lg font-semibold text-foreground">{{ props.title }}</h2>
          <div class="text-sm text-muted-foreground">
            <slot name="content" />
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <slot name="footer" />
        </div>
      </form>
    </div>
  </div>
</template>
