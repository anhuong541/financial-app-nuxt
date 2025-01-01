<template>
  <NuxtLayout name="user-layout">
    <div class="p-2 bg-white shadow-md rounded-md">
      <div>Hello World from Habit Tracking Page</div>
      <button>trigger data api</button>
      <Button @click="signOut($auth)"> Sign Out </Button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
import Button from "~/components/common/Button.vue";

const router = useRouter();
const { $auth } = useNuxtApp();
const { isAuthenticated } = useAuth();

watch(isAuthenticated, (val) => {
  if (!val) {
    router.push("/login");
  }
});
</script>
