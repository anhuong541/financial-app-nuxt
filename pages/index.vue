<template>
  <div class="flex flex-col gap-4">
    <h1>This is the home page</h1>
    <div>
      <button class="bg-red-500 py-3 px-7" @click="signInWithGoogle">trigger button</button>
      <button @click="signOut($auth)">signout</button>
    </div>

    <div>
      <button @click="counterStore.increment">increment count</button>
      <button @click="counterStore.decrement">decrement count</button>
      <p>{{ counterStore.count }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { signInWithPopup, signOut } from "firebase/auth";
import { provider } from "~/plugins/firebase";
import { useCounterStore } from "~/stores/index";

const counterStore = useCounterStore();

let { authState, isAuthenticated } = useAuth();
const { $auth, $axios } = useNuxtApp();
const hello = (text: string) => console.log(text);

watch(authState, (val) => {
  console.log("user", { val });
});
watch(isAuthenticated, (val) => {
  console.log("user", { val });
});

async function signInWithGoogle() {
  console.log("trigger!!!", $auth, provider);
  try {
    const result = await signInWithPopup($auth, provider);
    const user = result.user; // User info after successful login
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
}
</script>
