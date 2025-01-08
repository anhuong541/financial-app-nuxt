<script setup lang="ts">
import { LayoutDashboard } from "lucide-vue-next";
import { signInWithPopup } from "firebase/auth";
import { provider } from "~/plugins/firebase";
import LoginForm from "~/components/pages-dependencies/login/LoginForm.vue";
import Button from "~/components/common/Button.vue";
import { APP_PARAM_COOKIE } from "~/constants/cookie";

const router = useRouter();
const { $auth } = useNuxtApp();
const { isAuthenticated } = useAuth();
const appParam = useCookie(APP_PARAM_COOKIE);

watch(isAuthenticated, (val) => {
  if (val) {
    router.push(appParam.value ?? "/habit-tracking");
  }
});

async function signInWithGoogle() {
  await signInWithPopup($auth, provider).catch((err) => console.log("error: ", err));
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-coral-500 flex items-center justify-center">
          <LayoutDashboard class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
        <p class="mt-2 text-gray-600">
          Sign in with Google to access <strong class="font-medium text-coral-500">Habit Tracking</strong><br />Email sign-in not
          working ¯\_(ツ)_/¯
        </p>
      </div>

      <!-- Gmail Login -->
      <Button variant="outline" class="w-full" @click="signInWithGoogle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
          <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
          <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
          <path
            fill="#c62828"
            d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
          />
          <path
            fill="#fbc02d"
            d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
          />
        </svg>
        Connect with Google
      </Button>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-50 text-gray-500"> or sign in with email </span>
        </div>
      </div>

      <LoginForm />

      <p class="text-center text-sm text-gray-600">
        No account?
        <a href="#" class="font-medium text-coral-500 hover:text-coral-400"> Create an account </a>
      </p>
    </div>
  </div>
</template>
