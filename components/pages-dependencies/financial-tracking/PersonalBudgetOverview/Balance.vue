<template>
  <div class="col-span-12 bg-gray-600 p-6 rounded-xl">
    <p class="text-sm mb-2 text-white">Total Balance</p>
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-1 text-white">
        <Wallet class="w-6 h-6" />
        <span class="text-4xl font-medium ml-1">$320.845,20</span>
      </div>
      <div class="flex gap-3">
        <CashflowUpdateModal />
        <Button variant="contrast">
          <MoreHorizontalIcon class="w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "~/components/common/Button.vue";
import { MoreHorizontalIcon, Wallet } from "lucide-vue-next";
import CashflowUpdateModal from "./Modals/CashflowUpdateModal.vue";
</script>
