<script setup lang="ts">
import { cva } from "class-variance-authority";

const props = defineProps<{
  class?: string;
  size?: "large" | "small" | "medium";
  borderRadius?: "large" | "none" | "medium" | "rounded";
  variant?: "primary" | "outline" | "destructive" | "contrast";
  border?: "none" | "default" | "medium";
}>();

const buttonVariants = cva("flex justify-center items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium", {
  variants: {
    variant: {
      primary: "text-white bg-coral-500 hover:bg-coral-600",
      outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
      destructive: "border border-red-500 hover:bg-red-500 hover:text-white text-red-500",
      contrast: "border border-gray-900 bg-gray-900 text-white hover:opacity-80",
    },
    size: { small: "px-2 py-1 text-xs", medium: "px-4 py-2 text-sm", large: "px-6 py-3 text-lg" },
    borderRadius: {
      none: "",
      medium: "rounded-md",
      large: "rounded-lg",
      rounded: "rounded-full",
    },
    border: {
      none: "border-0",
      default: "border",
      medium: "border-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    borderRadius: "medium",
    border: "default",
  },
});
</script>

<template>
  <button
    :class="
      cn(
        buttonVariants({
          variant: props.variant,
          size: props.size,
          borderRadius: props.borderRadius,
          border: props.border,
          class: props.class,
        })
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
