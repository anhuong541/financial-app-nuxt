import { onAuthStateChanged, type User } from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const authState = ref<User | null>(null);
  const isAuthenticated = ref(false);

  let unsubscribe: () => void;

  const initializeAuth = () => {
    unsubscribe = onAuthStateChanged($auth, (user) => {
      if (user) {
        authState.value = user;
        isAuthenticated.value = true;
      } else {
        authState.value = null;
        isAuthenticated.value = false;
      }
    });
  };

  onMounted(() => {
    initializeAuth();
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return {
    authState,
    isAuthenticated,
  };
};
