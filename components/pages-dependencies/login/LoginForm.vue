<template>
  <div>
    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
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
              placeholder="username@gmail.com"
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
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
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

      <Button type="submit" class="w-full">
        Sign in
        <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-vue-next";
import { ref } from "vue";
import Button from "~/components/common/Button.vue";

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
</script>
