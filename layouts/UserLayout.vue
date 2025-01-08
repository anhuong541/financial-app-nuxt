<template>
  <main class="bg-gray-100 h-screen px-4">
    <Header :app-type="props.appType" />
    <slot />
  </main>
</template>

<script lang="ts" setup>
import Header from "~/components/layouts/Header/index.vue";
import type { ProductivityType } from "~/types";

const props = defineProps<{
  appType: ProductivityType;
}>();
</script>
