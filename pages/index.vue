<template>
  <div>
    This is the home page

    <button @click="signInWithGoogle">trigger button</button>
  </div>
</template>

<script lang="ts" setup>
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { provider } from "~/plugins/firebase";

let userAuth = ref<User | null>(null);
const { $auth } = useNuxtApp();
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
