<template>
  <div class="relative w-full">
    <button
      @click="toggleDropdown"
      class="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <div class="w-5 h-5 bg-[#FF7155] rounded"></div>
      <span class="flex-1 text-left text-gray-900 text-sm whitespace-nowrap font-medium">
        {{ selected || placeholder }}
      </span>
      <ChevronDownIcon
        class="w-4 h-4 text-gray-400 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
      />
    </button>

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
        class="absolute z-10 mt-1 bg-white rounded-lg shadow-lg py-1 max-h-60 overflow-auto flex-shrink-0 text-sm whitespace-nowrap"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <div class="w-5 h-5 rounded bg-coral-500 flex-shrink-0" />
          <p>
            {{ option.label }}
          </p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "lucide-vue-next";

const props = defineProps<{ options: { value: string; label: string; href: string }[]; placeholder: string }>();
const attrs = useAttrs() as { onClick?: (option: any) => void };

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);
const selected = ref("");

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: any) => {
  selected.value = option.label;
  emit("update:modelValue", option.value);
  isOpen.value = false;
  if (attrs.onClick && option) {
    attrs.onClick(option);
  }
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
