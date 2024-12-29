<template>
  <div>
    <div>Hello World from About Page</div>
    <button @click="getApiTodos">trigger data api</button>
  </div>
</template>

<script setup lang="ts">
const { $getRequest } = useNuxtApp();

async function getApiTodos() {
  const res = await $getRequest<{ id: number; title: string; completed: boolean }>("");
  console.log({ res });
}
</script>
