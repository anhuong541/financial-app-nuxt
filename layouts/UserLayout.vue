<template>
  <main class="bg-gray-100 h-screen px-4">
    <Header />
    <slot />
  </main>
</template>

<script lang="ts" setup>
import Header from "~/components/layouts/Header/index.vue";
</script>
