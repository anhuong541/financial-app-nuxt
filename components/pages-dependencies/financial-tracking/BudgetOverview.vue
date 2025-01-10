<template>
  <div class="col-span-6 bg-white p-6 rounded-xl shadow-md">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <LayoutDashboard class="w-5 h-5" />
        <h1 class="text-lg font-medium">Overview</h1>
      </div>
      <ChevronRight class="w-5 h-5 text-gray-400" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="border p-4 rounded-xl shadow-sm">
        <div class="flex items-center gap-2 mb-2">
          <div class="p-2 bg-blue-100 rounded-lg">
            <LayoutGrid class="w-4 h-4 text-blue-600" />
          </div>
          <span class="text-gray-600">Balance</span>
        </div>
        <p class="text-2xl font-semibold">$ 96,280.00</p>
      </div>

      <div class="border p-4 rounded-xl shadow-sm">
        <div class="flex items-center gap-2 mb-2">
          <div class="p-2 bg-green-100 rounded-lg">
            <ArrowDownRight class="w-4 h-4 text-green-600" />
          </div>
          <span class="text-gray-600">Income</span>
        </div>
        <p class="text-2xl font-semibold">$ 32,150.00</p>
      </div>

      <div class="border p-4 rounded-xl shadow-sm">
        <div class="flex items-center gap-2 mb-2">
          <div class="p-2 bg-red-100 rounded-lg">
            <ArrowUpRight class="w-4 h-4 text-red-600" />
          </div>
          <span class="text-gray-600">Expense</span>
        </div>
        <p class="text-2xl font-semibold">$ 8,640.00</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownRight, ArrowUpRight, ChevronRight, LayoutDashboard, LayoutGrid } from "lucide-vue-next";
</script>
