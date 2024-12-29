<template>
  <div>
    This is the home page

    <button @click="triggerConsole">trigger button</button>
  </div>
</template>

<script lang="ts" setup>
type HelloFunction = (value: string) => void;

const nuxtApp = useNuxtApp();
const hello = nuxtApp.$hello as HelloFunction;

function triggerConsole() {
  console.log("trigger!!!");
  console.log({ axios: hello("An Huong") });
}
</script>
