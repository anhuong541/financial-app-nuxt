<template>
  <div>
    <p>Hello World</p>
    <p>{{ addHabitModalStore.open }}</p>

    <button @click="addHabitModalStore.onChangeModal">click</button>
  </div>
</template>

<script lang="ts" setup>
import { addHabitModalStore } from "~/stores/globalModals";
</script>
