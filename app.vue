<script setup lang="ts">
const layoutName = "body-layout";
</script>

<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
