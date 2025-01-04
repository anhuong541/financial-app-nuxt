import { useQuery } from "@tanstack/vue-query";
import { queryKeys } from "./query-key";
import { collection, doc } from "firebase/firestore";

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
