<script setup>
import { LayoutDashboard, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-vue-next";
import { signInWithPopup } from "firebase/auth";
import { provider } from "~/plugins/firebase";
import { ref } from "vue";

const { $auth } = useNuxtApp();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const handleSubmit = () => {
  // Handle form submission
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};

const { authState, isAuthenticated } = useAuth();

watch(authState, (val) => {
  console.log({ val });
});
watch(isAuthenticated, (val) => {
  console.log({ val });
});

async function signInWithGoogle() {
  try {
    await signInWithPopup($auth, provider);
    // const user = result.user; // User info after successful login
    // console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
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

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <!-- Gmail Login -->
        <button
          type="button"
          class="w-full flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          @click="signInWithGoogle"
        >
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
        </button>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500"> or sign in with email </span>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                placeholder="info@pixsellz.io"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
              <a href="#" class="text-sm text-coral-500 hover:text-coral-400"> Forgot Password? </a>
            </div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-coral-500 focus:border-coral-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOff v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <input
              checked
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              value=""
              class="w-4 h-4 text-coral-600 bg-gray-100 border-gray-300 rounded focus:ring-coral-500"
            />
            <label for="remember" class="ms-2 text-sm text-gray-900"> Remember for 30 days </label>
          </div>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-500 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
        >
          Sign in
          <ArrowRight class="ml-2 h-4 w-4" />
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        No account?
        <a href="#" class="font-medium text-coral-500 hover:text-coral-400"> Create an account </a>
      </p>
    </div>
  </div>
</template>
