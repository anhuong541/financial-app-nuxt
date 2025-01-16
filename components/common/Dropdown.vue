<template>
  <div class="relative w-full">
    <slot name="trigger" :toggleDropdown :isOpen />

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute z-10 mt-1 bg-white rounded-lg shadow-lg py-1 max-h-60 w-full overflow-auto flex-shrink-0 text-sm whitespace-nowrap"
      >
        <slot name="item" v-for="(option, index) in props.options" :key="index" :data="option" :closeDropdown />
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ options: any[] }>();
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: any) => {
  if (!event?.target?.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
