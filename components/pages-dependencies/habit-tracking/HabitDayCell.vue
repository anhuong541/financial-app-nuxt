<template>
  <td :class="cellClass" :style="{ backgroundColor: isHabitCompleted ? habitColor : '#fff' }" @click="onClick">
    <div class="h-10 mx-auto rounded flex items-center justify-center">
      <CheckIcon v-if="isHabitCompleted" class="w-4 h-4 text-white" />
    </div>
  </td>
</template>

<script lang="ts" setup>
import { CheckIcon } from "lucide-vue-next";
import { cn } from "~/utils";

const { day, isLastHabit, today } = defineProps<{
  isHabitCompleted: boolean;
  habitColor: string;
  today: number | null;
  day: {
    date: number;
    dayName: string;
  };
  isLastHabit: boolean;
  onClick: () => void;
}>();

const cellClass = computed(() =>
  cn(
    "text-center border-l w-10 cursor-pointer transition-all duration-300",
    today === day.date && "bg-[#FFF3E0] border-x border-gray-300",
    isLastHabit && "border-b"
  )
);
</script>
