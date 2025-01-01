<template>
  <div class="lg:block hidden">
    <slot />
  </div>
  <div class="lg:hidden flex justify-center items-center h-screen">
    <h1 class="text-2xl font-bold text-coral-500">🗓️ Website only Works on Desktop 🗓️</h1>
  </div>
</template>

<script lang="ts" setup></script>
