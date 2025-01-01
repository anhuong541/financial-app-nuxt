<script setup lang="ts">
import { cva } from "class-variance-authority";

const props = defineProps<{
  class?: string;
  size?: "large" | "small" | "medium";
  borderRadius?: "large" | "none" | "default" | "rounded";
  variant?: "primary" | "secondary";
}>();

const buttonVariants = cva("flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium", {
  variants: {
    variant: {
      primary:
        "text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500",
      secondary: "",
    },
    size: { small: "px-2 py-1 text-xs", medium: "px-4 py-2 text-sm", large: "px-6 py-3 text-lg" },
    borderRadius: {
      none: "",
      default: "rounded-md",
      large: "rounded-lg",
      rounded: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    borderRadius: "default",
  },
});

const className = cn(
  buttonVariants({ variant: props.variant, size: props.size, borderRadius: props.borderRadius, class: props.class })
);
</script>

<template>
  <button :class="className" v-bind="$attrs">
    <slot />
  </button>
</template>
