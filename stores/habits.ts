import { defineStore } from "pinia";
import { initialHabit } from "~/constants/initialValue";
import type { HabitsType } from "~/types/habits-table-type";

type HabitStoreType = {
  habits: HabitsType[];
  selectedHabit: HabitsType;
  selectedHabitIndex: number | null;
};

export const useMyHabitsStore = defineStore("habits-store", {
  state: (): HabitStoreType => ({
    habits: [],
    selectedHabit: initialHabit,
    selectedHabitIndex: null,
  }),
  actions: {
    updateListHabits(habits: HabitsType[]) {
      this.habits = [...habits];
    },
    addHabit(habit: HabitsType) {
      this.habits = [...this.habits, habit];
    },
    updateHabit(habit: HabitsType) {
      if (this.selectedHabitIndex) {
        this.habits[this.selectedHabitIndex] = { ...this.habits[this.selectedHabitIndex], ...habit };
      }
    },
    deleteHabit() {
      if (this.selectedHabitIndex) {
        this.habits.splice(this.selectedHabitIndex, 1);
      }
    },
    setSelectedHabit(habit: HabitsType) {
      this.selectedHabit = habit;
    },
    setSelectedHabitIndex(habitIndex: number) {
      this.selectedHabitIndex = habitIndex;
    },
  },
});
