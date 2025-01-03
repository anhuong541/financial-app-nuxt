<template>
  <Popover
    :items="avatarPopoverItems"
    :open="isAvatarPopoverOpen"
    v-on:close="() => (isAvatarPopoverOpen = false)"
    v-on:open="() => (isAvatarPopoverOpen = !isAvatarPopoverOpen)"
  >
    <div class="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
      <img src="/assets/images/default-avatar.webp" alt="default avatar" />
    </div>
  </Popover>
</template>

<script lang="ts" setup>
import { Home, LogOut } from "lucide-vue-next";
import { signOut } from "firebase/auth";
import Popover from "~/components/common/Popover.vue";
import type { PopoverItems } from "~/types/common-type";

const router = useRouter();
const { $auth } = useNuxtApp();

const isAvatarPopoverOpen = ref(false);
const avatarPopoverItems = ref<PopoverItems[]>([
  {
    label: "Home",
    icon: Home,
    action: () => router.push("/"),
  },
  {
    label: "Sign Out",
    icon: LogOut,
    action: () => signOut($auth),
  },
]);
</script>
