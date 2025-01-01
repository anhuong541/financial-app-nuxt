<template>
  <div class="mx-auto p-4">
    <div class="flex items-center justify-center gap-4 mb-6">
      <button class="p-2">
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <h2 class="font-medium">January, 2025</h2>
      <button class="p-2">
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Habit Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <!-- Header Row with Days -->
        <thead>
          <tr class="text-sm">
            <th class="font-normal p-2 text-left min-w-[200px]">
              <span class="text-blue-600">Habits</span>
            </th>
            <template v-for="day in days" :key="day.date">
              <th
                :class="
                  cn('p-1 w-10 text-center font-normal', today === day.date && 'bg-gray-700 text-white border border-gray-700')
                "
              >
                <p class="text-xs text-gray-400">{{ day.dayName }}</p>
                <div>{{ day.date }}</div>
              </th>
            </template>
            <th class="font-normal p-2 text-center min-w-[80px] text-blue-600">Achieved</th>
          </tr>
        </thead>

        <!-- Habit Rows -->
        <tbody>
          <tr v-for="(habit, index) in habits" :key="habit.name" class="border-t text-sm">
            <td class="p-2">{{ habit.name }}</td>
            <template v-for="day in days" :key="day.date">
              <td
                :class="
                  cn(
                    'text-center border-l w-10 cursor-pointer',
                    isHabitCompleted(habit, day.date) && 'bg-gray-100',
                    today === day.date && 'border-x border-gray-700 text-white',
                    index === habits.length - 1 && 'border-b'
                  )
                "
                @click="toggleHabit(habit, day.date)"
              >
                <div class="h-10 mx-auto rounded flex items-center justify-center cursor-pointer">
                  <CheckIcon v-if="isHabitCompleted(habit, day.date)" class="w-4 h-4 text-gray-600" />
                </div>
              </td>
            </template>
            <td class="p-2 text-center border-l">{{ habit.achieved }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Habit Button -->
    <Button class="mt-4"> <Plus class="w-4 h-4" /> New Habit</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, Plus } from "lucide-vue-next";
import Button from "~/components/common/Button.vue";

type HabitType = { name: string; achieved: number };

// Generate days for January 2025
const days = ref<{ date: number; dayName: string }[]>([]);
const startDate = new Date(2025, 0, 1);
const today = new Date().getDate();
const daysInMonth = new Date(2025, 1, 0).getDate();
const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

for (let i = 1; i <= daysInMonth; i++) {
  const date = new Date(2025, 0, i);
  days.value.push({
    date: i,
    dayName: dayNames[date.getDay()],
  });
}

// Habits data
const habits = ref<HabitType[]>([
  { name: "Exercise 💪", achieved: 0 },
  { name: "Meditation 🧘 (minute)", achieved: 0 },
  { name: "Read Book 📚 (minute)", achieved: 0 },
  { name: "Saying No to mr.Joker", achieved: 0 },
  { name: "Commit 1 code ( Not code commit at the company )", achieved: 2 },
  { name: "No Game", achieved: 0 },
  { name: "Work for 2 hour - 8 hour at the weekend", achieved: 0 },
]);

// Completed habits tracking
const completedHabits = ref(new Set());

const toggleHabit = (habit: HabitType, date: number) => {
  const key = `${habit.name}-${date}`;
  if (completedHabits.value.has(key)) {
    completedHabits.value.delete(key);
    habit.achieved = Math.max(0, habit.achieved - 1);
  } else {
    completedHabits.value.add(key);
    habit.achieved += 1;
  }
};

const isHabitCompleted = (habit: HabitType, date: number) => {
  return completedHabits.value.has(`${habit.name}-${date}`);
};
</script>
