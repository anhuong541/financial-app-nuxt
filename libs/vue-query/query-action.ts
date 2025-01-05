import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryKeys } from "./query-key";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { AddHabitForm } from "~/types/habits-table-type";

// queries
export const useQueryUserHabits = () => {
  const { authState } = useAuth();
  const { $firestore, $getFirebaseDocs } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useQuery({
    enabled: computed(() => !!userId.value), // Ensure the query only runs when userId is ready
    queryKey: computed(() => [queryKeys.listUserHabits, userId.value]),
    queryFn: async () => {
      if (userId.value) {
        const colRef = collection($firestore, "users", userId.value, "habits");
        return await $getFirebaseDocs(colRef);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useQueryCheckingUserHabit = (timeKey: ComputedRef<string>) => {
  const { authState } = useAuth();
  const { $firestore, $getFirebaseDoc } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    enabled: computed(() => !!userId.value), // Ensure the query only runs when userId is ready
    queryKey: computed(() => [queryKeys.checkingHabits, userId.value, timeKey]),
    queryFn: async () => {
      if (userId.value) {
        const docRef = doc($firestore, "users", userId.value, "habits-tracker", timeKey.value);
        return (await $getFirebaseDoc(docRef)) ?? {};
      }
    },
  });
};

// mutations
export const useMutationMarkCheckingHabit = () => {
  const { authState } = useAuth();
  const { $firestore } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useMutation({
    mutationFn: async ({ day, habitKey, value, timeKey }: { day: number; habitKey: string; value: boolean; timeKey: string }) => {
      if (userId.value) {
        const docRef = doc($firestore, "users", userId.value, "habits-tracker", timeKey);
        const docSnap = await getDoc(docRef);
        const fieldPath = `${day}.${habitKey}`;
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            [fieldPath]: value,
          });
        } else {
          await setDoc(docRef, {
            [day]: { [habitKey]: value },
          });
        }
      }
    },
  });
};

export const useMutationAddNewHabit = () => {
  const { authState } = useAuth();
  const { $firestore } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useMutation({
    mutationFn: async (habit: AddHabitForm) => {
      if (userId.value) {
        const habitId = toKebabCase(habit.label);
        const docRef = doc($firestore, "users", userId.value, "habits", habitId);
        await setDoc(docRef, {
          ...habit,
          id: habitId,
          created_at: firebastDataFormat(new Date()),
          updated_at: firebastDataFormat(new Date()),
        });
      }
    },
  });
};

export const useMutationEditHabit = () => {
  const { authState } = useAuth();
  const { $firestore } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useMutation({
    mutationFn: async ({ habit, habitId }: { habit: AddHabitForm; habitId: string }) => {
      if (userId.value) {
        const docRef = doc($firestore, "users", userId.value, "habits", habitId);
        await updateDoc(docRef, {
          ...habit,
          id: habitId,
          updated_at: firebastDataFormat(new Date()),
        });
      }
    },
  });
};
