<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import HabitTrackingTable from "~/components/pages-dependencies/habit-tracking/HabitTrackingTable.vue";
</script>

<template>
  <NuxtLayout name="user-layout">
    <div class="p-2 bg-white shadow-md rounded-md">
      <HabitTrackingTable />
    </div>
  </NuxtLayout>
</template>
