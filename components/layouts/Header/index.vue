<template>
  <header class="relative h-16 flex items-center justify-between mx-auto">
    <div class="flex items-center gap-2">
      <button class="p-2 bg-white shadow-md rounded-md">
        <Menu class="w-5 h-5" />
      </button>
      <Dropdown :options="options" v-on:click="handleOptionOnclick">
        <template #trigger="{ toggleDropdown, isOpen }">
          <button
            @click="toggleDropdown"
            class="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
            :aria-expanded="isOpen"
            aria-haspopup="true"
          >
            <div class="w-5 h-5 bg-[#FF7155] rounded"></div>
            <span class="flex-1 text-left text-gray-900 text-sm whitespace-nowrap font-medium">
              {{ productivityMainHeader[props.appType].title }}
            </span>
            <ChevronDownIcon
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'transform rotate-180': isOpen }"
            />
          </button>
        </template>
        <template #item="{ data }">
          <div class="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" @click="handleOptionOnclick(data)">
            <div class="w-5 h-5 rounded bg-coral-500 flex-shrink-0" />
            <p>
              {{ data.label }}
            </p>
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="absolute top-4 left-1/2 -translate-x-1/2 flex items-center">
      <div class="text-2xl font-bold flex items-center gap-1">
        <span class="text-coral-500">{{ productivityMainHeader[props.appType].title }}</span>
        <span>App</span>
      </div>
    </div>

    <div class="flex items-center justify-end space-x-4">
      <Avatar />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ChevronDownIcon, Menu } from "lucide-vue-next";
import Avatar from "./Avatar.vue";
import type { ProductivityType } from "~/types";
import { productivityMainHeader } from "~/constants/title";
import Dropdown from "~/components/common/Dropdown.vue";

type NavHeaderOption = {
  href: string;
};

const props = defineProps<{ appType: ProductivityType }>();
const router = useRouter();
const options = ref<
  {
    href: string;
    label: string;
    value: string;
  }[]
>([]);

const handleOptionOnclick = (option: NavHeaderOption) => {
  const key = option?.href?.split("/")[1];
  if (option.href && props.appType !== key) {
    router.push(option.href).catch((err) => console.error("Router error:", err));
  }
};

const createOptions = () => {
  const keys = Object.keys(productivityMainHeader);
  keys.forEach((key) => {
    const href = "/" + key;
    options.value.push({
      label: productivityMainHeader[key].title,
      value: href,
      href,
    });
  });
};
createOptions();
</script>
