<template>
  <div>
    <p>Hello World</p>

    <button @click="handleTrackingHabits">click</button>
  </div>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "firebase/firestore";

const { authState } = useAuth();
const userId = ref<string | undefined>(undefined);
const { $firestore } = useNuxtApp();

watch(authState, (val) => {
  userId.value = val?.uid;
});

const handleFirebase = async () => {
  if (!userId.value) {
    return;
  }
  try {
    // Reference the collection
    const colRef = collection($firestore, "users", userId.value, "habits");
    const querySnapshot = await getDocs(colRef);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document Data
    }));

    console.log("Fetched Documents:", docs);
    return docs;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

const handleTrackingHabits = async () => {
  if (!userId.value) {
    return;
  }
  try {
    // Reference the collection
    const colRef = collection($firestore, "users", userId.value, "habits-tracker");
    const querySnapshot = await getDocs(colRef);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched Documents:", docs);
    return docs;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};
</script>
