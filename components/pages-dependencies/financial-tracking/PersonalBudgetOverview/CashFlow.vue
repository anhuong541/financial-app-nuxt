<template>
  <div class="col-span-9 bg-white rounded-xl p-6">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <TrendingDownIcon class="w-5 h-5 text-[#ff7043]" />
        <h2 class="text-xl font-semibold">Cash Flow</h2>
      </div>
      <div class="flex gap-3">
        <button class="bg-gray-100 px-4 py-2 rounded-lg">Weekly</button>
        <button class="px-4 py-2">Daily</button>
        <button class="flex items-center gap-2 px-4 py-2"><SettingsIcon class="w-4 h-4" />Manage</button>
      </div>
    </div>

    <!-- Income/Expense Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-[#2F4858] rounded-lg">
          <TrendingDownIcon class="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 class="text-sm text-gray-600">Income</h3>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold">€12.378,20</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="p-2 bg-[#4CD080] rounded-lg">
          <TrendingUpIcon class="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 class="text-sm text-gray-600">Expense</h3>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold">€5.788,21</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SettingsIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-vue-next";
</script>
