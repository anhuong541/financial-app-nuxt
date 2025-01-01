<script setup lang="ts">
const layoutName = "responsive-remove-mobile";
</script>

<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
