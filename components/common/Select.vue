<template>
  <div>
    <p v-if="props.title" class="block text-sm font-medium text-gray-700">{{ props.title }}</p>
    <div class="relative inline-block w-full mt-1">
      <!-- Dropdown Button -->
      <button
        type="button"
        @click="toggleDropdown"
        @blur="closeDropdown"
        class="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
        :class="{ 'text-gray-700': !selectedOption, 'text-black': selectedOption }"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
      >
        <span v-if="selectedOption">{{ selectedOption.label }}</span>
        <span v-else class="text-gray-400">{{ placeholder }}</span>
        <ChevronDownIcon class="w-5 h-5 text-gray-400" />
      </button>

      <!-- Dropdown Options -->
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
          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            @keydown.enter="selectOption(option)"
            @keydown.space="selectOption(option)"
            class="relative py-2 pl-3 pr-9 cursor-pointer select-none hover:bg-blue-100 focus:bg-blue-100"
            :class="{ 'bg-blue-100 font-semibold': option.value === selectedOption?.value }"
            role="option"
            :aria-selected="option.value === selectedOption?.value"
            tabindex="0"
          >
            <span class="block truncate">{{ option.label }}</span>
            <CheckIcon
              v-if="option.value === selectedOption?.value"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 w-5 h-5"
            />
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDownIcon, CheckIcon } from "lucide-vue-next";

// Props
interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  options: Option[];
  placeholder?: string;
  title?: string;
}>();

// Reactive State
const isOpen = ref(false);
const selectedOption = ref<Option | null>(null);

// Props Defaults
const placeholder = computed(() => props.placeholder || "Select an option");

// Methods
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function selectOption(option: Option) {
  selectedOption.value = option;
  isOpen.value = false;
}

// Computed for current label
const selectedLabel = computed(() => selectedOption.value?.label || placeholder.value);
</script>
