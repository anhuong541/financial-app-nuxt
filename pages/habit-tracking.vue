<template>
  <NuxtLayout name="user-layout">
    <div class="p-2 bg-white shadow-md rounded-md">
      <HabitTrackingTable />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import HabitTrackingTable from "~/components/pages-dependencies/habit-tracking/HabitTrackingTable.vue";

const router = useRouter();
const { isAuthenticated } = useAuth();

watch(isAuthenticated, (val) => {
  if (!val) {
    router.push("/login");
  }
});
</script>
