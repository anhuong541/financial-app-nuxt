<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <NuxtLayout name="user-layout">
    <div class="p-2 bg-white shadow-md rounded-md">Hello World</div>
  </NuxtLayout>
</template>
