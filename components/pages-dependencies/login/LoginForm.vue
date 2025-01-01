<script lang="ts" setup>
import { Mail, Lock, ArrowRight } from "lucide-vue-next";
import { ref } from "vue";
import Button from "~/components/common/Button.vue";
import Input from "~/components/common/Input.vue";

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

<template>
  <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-6">
      <Input id="password" :icon="Mail" title="Email" v-model="email" type="email" required placeholder="username@gmail.com" />
      <Input
        id="email"
        :icon="Lock"
        title="Password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        required
        placeholder="Enter your password"
        link="Forgot Password?"
        href="#"
        :show-password="showPassword"
        :show-password-click="() => (showPassword = !showPassword)"
      />
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

    <Button
      type="submit"
      class="w-full disabled:opacity-40 disabled:active:opacity-40 disabled:hover:opacity-40 disabled:hover:bg-coral-500"
      disabled
    >
      Sign in
      <ArrowRight class="h-4 w-4" />
    </Button>
  </form>
</template>
