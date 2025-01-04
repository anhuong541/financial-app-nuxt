<template>
  <div class="mx-auto p-4">
    <div class="flex items-center justify-center gap-4 mb-6">
      <button class="p-2" @click="decreaseMonth(selectMonth)">
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <h2 class="font-medium">{{ getMonthName(selectMonth, "MMMM") }}, {{ selectYear }}</h2>
      <button class="p-2" @click="increaseMonth(selectMonth)">
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>
    <!-- Habit Table -->
    <div class="overflow-x-auto mb-4">
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
          <tr
            v-for="(habit, index) in habits"
            :key="habit.id"
            :class="cn('border-t text-sm', index === habits.length - 1 && 'border-b')"
          >
            <td class="p-2">{{ habit.label }}</td>
            <template v-for="day in days" :key="day.date">
              <td
                :class="
                  cn(
                    'text-center border-l w-10 cursor-pointer',
                    // isHabitCompleted(habit, day.date) && `bg-[${habit.color}]`,
                    today === day.date && 'border-x border-gray-700 text-white',
                    index === habits.length - 1 && 'border-b'
                  )
                "
                :style="{ backgroundColor: isHabitCompleted(habit, day.date) ? habit.color : '#fff' }"
                @click="
                  async () => {
                    toggleHabit(habit, day.date);
                    // this is toggle is update the habit value
                    await checkHabit({ day: day.date, habitKey: habit.id, value: isHabitCompleted(habit, day.date) });
                  }
                "
              >
                <div class="h-10 mx-auto rounded flex items-center justify-center cursor-pointer">
                  <CheckIcon v-if="isHabitCompleted(habit, day.date)" class="w-4 h-4 text-white" />
                </div>
              </td>
            </template>
            <td class="p-2 text-center border-l">0</td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddHabitModal />
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-vue-next";
import { useMutationMarkCheckingHabit, useQueryCheckingUserHabit, useQueryUserHabits } from "~/libs/vue-query/query-action";
import type { HabitsType } from "~/types/habits-table-type";
import AddHabitModal from "./AddHabitModal.vue";
import { getMonthName } from "~/utils";
import { ref } from "vue";
import dayjs from "dayjs";

// Completed habits tracking
const completedHabits = ref(new Set());
const days = ref<{ date: number; dayName: string }[]>([]);
const habitsAchived = ref<{ [key: string]: number }>({});
const selectMonth = ref(dayjs().month());
const selectYear = ref(dayjs().year());
const curentYear = dayjs().year();
const curentMonth = dayjs().month();
const today = ref<number | null>(dayjs().date());
const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

const selectCurrentCheckingTime = computed(() => {
  const year = selectYear.value;
  const month = getMonthName(selectMonth.value, "MMM");
  return `${year}-${month}`;
});

const { data: habits } = useQueryUserHabits();
const { data: checkingHabit } = useQueryCheckingUserHabit(selectCurrentCheckingTime.value);

const { mutateAsync: checkHabit } = useMutationMarkCheckingHabit(selectCurrentCheckingTime.value);

const increaseMonth = (month: number) => {
  if (month === 11) {
    selectMonth.value = 0;
    selectYear.value++;
  } else {
    selectMonth.value++;
  }
};

const decreaseMonth = (month: number) => {
  if (month === 0) {
    selectMonth.value = 11;
    selectYear.value--;
  } else {
    selectMonth.value--;
  }
};

const toggleHabit = (habit: HabitsType, date: number) => {
  const key = `${selectYear.value}-${selectMonth.value}-${habit.id}-${date}`;
  if (completedHabits.value.has(key)) {
    completedHabits.value.delete(key);
  } else {
    completedHabits.value.add(key);
  }
};

const isHabitCompleted = (habit: HabitsType, date: number) => {
  return completedHabits.value.has(`${selectYear.value}-${selectMonth.value}-${habit.id}-${date}`);
};

const calculateDays = () => {
  const startDate = dayjs(`2025-${selectMonth.value + 1}-1`);
  const daysInMonth = startDate.daysInMonth();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = startDate.date(i);
    days.value.push({
      date: i,
      dayName: dayNames[date.day()],
    });
  }
};

calculateDays();
watch(selectMonth, () => {
  days.value = [];
  calculateDays();
});

watch([selectMonth, selectYear], ([newSelectMonth, newSelectYear]) => {
  if (curentMonth === newSelectMonth && curentYear === newSelectYear) {
    today.value = dayjs().date();
  } else {
    today.value = null;
  }
});

watch(checkingHabit, (checkinValue) => {
  // update hatbit key
  const listHabits = habits.value.map((item: any) => item.id);
  const dayKeys = Object.keys(checkinValue);
  dayKeys.forEach((day) => {
    listHabits.forEach((habit: string) => {
      const key = `${selectYear.value}-${selectMonth.value}-${habit}-${day}`;
      if (checkinValue[day][habit]) {
        completedHabits.value.add(key);
      } else {
        completedHabits.value.delete(key);
      }
    });
  });
});
</script>
