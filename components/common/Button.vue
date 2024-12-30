<script setup>
import { computed, defineProps } from "vue";
import { cn } from "@/utils";
import { buttonVariants } from "@/utils/buttonVariants";

// Define the props for the Button component
defineProps({
  variant: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "md",
  },
  className: {
    type: String,
    default: "",
  },
  borderRadius: {
    type: String,
    default: "rounded",
  },
});

// Compute the button's dynamic classes
const buttonClasses = computed(() => {
  return cn(buttonVariants({ variant, size, className, borderRadius }));
});
</script>

<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot />
  </button>
</template>
