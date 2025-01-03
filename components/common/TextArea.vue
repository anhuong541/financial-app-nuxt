<script setup lang="ts">
import { cva } from "class-variance-authority";
import { type LucideIcon } from "lucide-vue-next";

const props = defineProps<{
  id: string;
  title?: string;
  class?: string;
  icon?: LucideIcon;
  link?: string;
  href?: string;
  variant?: "primary";
  borderRadius?: "none" | "medium" | "large" | "rounded";
  size?: "medium";
}>();

const inputVariants = cva("block w-full border border-gray-300 rounded-md", {
  variants: {
    variant: {
      primary: "focus:outline-none focus:ring-coral-500 focus:border-coral-500",
    },
    borderRadius: {
      none: "",
      medium: "rounded-md",
      large: "rounded-lg",
      rounded: "rounded-full",
    },
    size: { medium: "pl-10 pr-3 py-2 text-sm" },
  },
  defaultVariants: {
    variant: "primary",
    borderRadius: "medium",
    size: "medium",
  },
});

const className = cn(inputVariants({ variant: props.variant, borderRadius: props.borderRadius, class: props.class }));
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <label v-if="props.title" :for="props.id" class="block text-sm font-medium text-gray-700"> {{ props.title }} </label>
      <a :href="props.href" class="text-sm text-coral-500 hover:text-coral-400"> {{ props.link }} </a>
    </div>

    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute left-0 top-2 pl-3 flex items-center pointer-events-none">
        <icon class="h-5 w-5 text-gray-400" />
      </div>
      <textarea :id="props.id" v-bind="$attrs" :class="className" />
    </div>
  </div>
</template>
