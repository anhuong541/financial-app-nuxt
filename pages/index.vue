<template>
  <div>
    This is the home page

    <button @click="triggerConsole">trigger button</button>
  </div>
</template>

<script lang="ts" setup>
import { HelloFunction } from "~/types/plugins"

const nuxtApp = useNuxtApp();
const hello = nuxtApp.$hello as HelloFunction;

function triggerConsole() {
  console.log("trigger!!!");
  console.log({ axios: hello("An Huong") });
}
</script>
