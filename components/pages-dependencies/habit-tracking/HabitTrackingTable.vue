<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-vue-next";
import { useMutationMarkCheckingHabit, useQueryCheckingUserHabit, useQueryUserHabits } from "~/libs/vue-query/query-action";
import type { HabitsType } from "~/types/habits-table-type";
import AddHabitModal from "./AddHabitModal.vue";
import { getMonthName, getDateKey } from "~/utils";
import { ref } from "vue";
import dayjs from "dayjs";
import EditHabitModal from "./EditHabitModal.vue";
import { editHabitModalStore } from "~/stores/globalModals";
import AchievedCell from "./AchievedCell.vue";
import HabitDayCell from "./HabitDayCell.vue";

// Completed habits tracking
const completedHabits = ref(new Set());
const days = ref<{ date: number; dayName: string }[]>([]);
const habitsAchieved = ref<{ [key: string]: { [key: string]: number } }>({});
const selectMonth = ref(dayjs().month());
const selectYear = ref(dayjs().year());
const curentYear = dayjs().year();
const curentMonth = dayjs().month();
const today = ref<number | null>(dayjs().date());
const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
const listHabits = ref<HabitsType[]>([]);
const dragSourceIndex = ref<number | null>(null);
const isDragable = ref(false);
const checkKey = ref<{ [key: string]: boolean }>({});
const selectedHabit = ref<HabitsType>({
  id: "",
  label: "",
  tag: "",
  created_at: {
    seconds: 0,
    nanoseconds: 0,
  },
  category: [],
  updated_at: {
    seconds: 0,
    nanoseconds: 0,
  },
  order: 0,
  description: "",
  color: "",
  goal: 0,
});

const selectCurrentCheckingTime = computed(() => getDateKey(selectYear.value, selectMonth.value));

const editHabitModal = editHabitModalStore();
const { data: habits } = useQueryUserHabits();
const { data: checkingHabit } = useQueryCheckingUserHabit(selectCurrentCheckingTime, checkKey.value);
const { mutateAsync: checkHabit } = useMutationMarkCheckingHabit();
// const { mutateAsync: updateHabitOrder } = useMutationUpdateHabitsOrder();
// This is feature is suspend because of my budget not allow

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

const updateArchived = (habitId: string, month: number, year: number, type: "plus" | "minus") => {
  const dateKey = getDateKey(year, month);
  if (!habitsAchieved.value[dateKey]) {
    habitsAchieved.value[dateKey] = {};
  }
  if (!habitsAchieved.value[dateKey][habitId]) {
    habitsAchieved.value[dateKey][habitId] = 0;
  }

  if (type === "plus") {
    habitsAchieved.value[dateKey][habitId]++;
  } else if (type === "minus" && habitsAchieved.value[dateKey][habitId] > 0) {
    habitsAchieved.value[dateKey][habitId]--;
  }
};

const onDragStart = (index: number) => {
  dragSourceIndex.value = index;
};

const onDragOver = (index: number) => {
  // Prevent the default to allow dropping
};

const onDrop = (targetIndex: number) => {
  const sourceIndex = dragSourceIndex.value;
  // console.log({ targetIndex, dragSourceIndex: dragSourceIndex.value });
  if (sourceIndex === null || sourceIndex === targetIndex) return;

  const draggedItem = listHabits.value[sourceIndex];
  const updatedItems = [...listHabits.value];

  updatedItems.splice(sourceIndex, 1);
  updatedItems.splice(targetIndex, 0, draggedItem);
  listHabits.value = [...updatedItems];
  // Clear the drag source index
  dragSourceIndex.value = null;
};

const toggleHabit = (habit: HabitsType, date: number) => {
  const key = `${selectYear.value}-${selectMonth.value}-${habit.id}-${date}`;
  if (completedHabits.value.has(key)) {
    completedHabits.value.delete(key);
    updateArchived(habit.id, selectMonth.value, selectYear.value, "minus");
  } else {
    completedHabits.value.add(key);
    updateArchived(habit.id, selectMonth.value, selectYear.value, "plus");
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

watch(habits, (val) => {
  listHabits.value = [...(val ?? [])].sort((a: HabitsType, b: HabitsType) => a.order - b.order);
});

watch([selectMonth, selectYear], ([newSelectMonth, newSelectYear]) => {
  if (curentMonth === newSelectMonth && curentYear === newSelectYear) {
    today.value = dayjs().date();
  } else {
    today.value = null;
  }

  // Reset archived data if switching months or years
  const dateKey = getDateKey(newSelectYear, newSelectMonth);
  if (!habitsAchieved.value[dateKey]) {
    habitsAchieved.value[dateKey] = {};
  }
});

watch(checkingHabit, (checkinValue) => {
  if (checkinValue && !checkKey.value[selectCurrentCheckingTime.value]) {
    const listHabits = habits.value.map((item: any) => item.id);
    const dayKeys = Object.keys(checkinValue);
    dayKeys.forEach((day) => {
      listHabits.forEach((habit: string) => {
        const key = `${selectYear.value}-${selectMonth.value}-${habit}-${day}`;
        if (checkinValue[day][habit]) {
          completedHabits.value.add(key);
          updateArchived(habit, selectMonth.value, selectYear.value, "plus");
        }
      });
    });
    checkKey.value[selectCurrentCheckingTime.value] = true;
  }
});
</script>

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

    <div class="overflow-x-auto mb-4">
      <table class="border-collapse table-auto 2xl:w-full w-[1600px]">
        <thead>
          <tr class="text-sm">
            <th class="font-normal p-2 text-left min-w-[200px]">
              <span class="text-coral-600 font-medium">Habits</span>
            </th>
            <template v-for="day in days" :key="day.date">
              <th :class="cn('p-1 w-10 text-center font-normal', today === day.date && 'bg-[#FFF3E0] border border-[#FFF3E0]')">
                <p class="text-xs text-gray-400">{{ day.dayName }}</p>
                <div>{{ day.date }}</div>
              </th>
            </template>
            <th class="font-medium p-2 text-center min-w-[80px] text-coral-600">Goal</th>
            <th class="font-medium p-2 text-center min-w-[80px] border-l text-coral-600">Achieved</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(habit, index) in listHabits"
            :key="habit.id"
            :class="cn('border-t text-sm hover:!bg-gray-100', index === habits.length - 1 && 'border-b')"
            :draggable="isDragable"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @drop="onDrop(index)"
          >
            <td
              class="p-2 cursor-pointer"
              @click="
                () => {
                  editHabitModal.onChangeModal();
                  selectedHabit = habit;
                }
              "
              v-on:mouseenter="isDragable = true"
              v-on:mouseleave="isDragable = false"
            >
              {{ habit.label }}
            </td>
            <HabitDayCell
              v-for="day in days"
              :key="day.date"
              v-on:click="
                async () => {
                  toggleHabit(habit, day.date);
                  // this is toggle is update the habit value
                  await checkHabit({
                    day: day.date,
                    habitKey: habit.id,
                    value: isHabitCompleted(habit, day.date),
                    timeKey: selectCurrentCheckingTime,
                  });
                }
              "
              :is-habit-completed="isHabitCompleted(habit, day.date)"
              :habit-color="habit.color"
              :day="day"
              :is-last-habit="index === habits.length - 1"
              :today="today"
            />

            <td class="p-2 text-center border-x">
              {{ habit.goal ?? 0 }}
            </td>
            <td class="p-2 text-center border-l">
              <!-- {{ habitsAchieved[getDateKey(selectYear, selectMonth)]?.[habit.id] ?? 0 }} -->
              <AchievedCell
                :archived="habitsAchieved[getDateKey(selectYear, selectMonth)]?.[habit.id] ?? 0"
                :goal="habit.goal ?? 0"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditHabitModal :habit="selectedHabit" />
    <AddHabitModal :habits="habits ?? []" />
  </div>
</template>
