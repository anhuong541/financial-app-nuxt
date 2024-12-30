<template>
  <div class="flex flex-col gap-4">
    <h1>This is the home page</h1>
    <div>
      <button @click="signInWithGoogle">trigger button</button>
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
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { provider } from "~/plugins/firebase";
import { useCounterStore } from "~/stores/index";

const counterStore = useCounterStore();

let userAuth = ref<User | null>(null);
const { $auth, $axios } = useNuxtApp();
const hello = (text: string) => console.log(text);

watch(userAuth, (val) => {
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

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) {
      userAuth.value = user; // Set the logged-in user
    } else {
      userAuth.value = null; // No user is signed in
    }
  });
});
</script>
