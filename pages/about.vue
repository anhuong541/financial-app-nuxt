<template>
  <div>
    <div>Hello World from About Page</div>
    <button @click="signOut($auth)">trigger data api</button>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";

const router = useRouter();
const { $auth } = useNuxtApp();
const { isAuthenticated } = useAuth();

watch(isAuthenticated, (val) => {
  if (!val) {
    router.push("/login");
  }
});
</script>
