import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryKeys } from "./query-key";
import { collection, doc, updateDoc } from "firebase/firestore";

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

export const useQueryCheckingUserHabit = (timeKey: string) => {
  const { authState } = useAuth();
  const { $firestore, $getFirebaseDoc } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useQuery({
    enabled: computed(() => !!userId.value), // Ensure the query only runs when userId is ready
    queryKey: computed(() => [queryKeys.checkingHabits, userId.value, timeKey]),
    queryFn: async () => {
      if (userId.value) {
        const docRef = doc($firestore, "users", userId.value, "habits-tracker", timeKey);
        return await $getFirebaseDoc(docRef);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// mutations
export const useMutationMarkCheckingHabit = (timeKey: string) => {
  const { authState } = useAuth();
  const { $firestore } = useNuxtApp();
  const userId = computed(() => authState.value?.uid ?? null);

  return useMutation({
    mutationFn: async ({ day, habitKey, value }: { day: number; habitKey: string; value: boolean }) => {
      if (userId.value) {
        const docRef = doc($firestore, "users", userId.value, "habits-tracker", timeKey);
        const fieldPath = `${day}.${habitKey}`;
        await updateDoc(docRef, {
          [fieldPath]: value,
        });
      }
    },
  });
};
