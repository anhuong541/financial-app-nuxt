<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Total Balance Card -->
    <div class="bg-[#2F4858] text-white p-6 rounded-xl mb-6">
      <p class="text-sm mb-2">Total Balance</p>
      <div class="flex justify-between items-center">
        <div class="flex items-baseline">
          <span class="text-3xl font-bold">€</span>
          <span class="text-4xl font-bold ml-1">320.845,20</span>
          <span class="ml-4 text-green-400">15.8% <TrendingUpIcon class="inline w-4 h-4" /></span>
        </div>
        <div class="flex gap-3">
          <button class="bg-[#4CD080] hover:bg-opacity-90 px-4 py-2 rounded-lg flex items-center gap-2">
            <PlusIcon class="w-5 h-5" /> Add
          </button>
          <button class="bg-[#1d2f38] hover:bg-opacity-90 px-4 py-2 rounded-lg flex items-center gap-2">
            <ArrowUpIcon class="w-5 h-5" /> Send
          </button>
          <button class="bg-[#1d2f38] hover:bg-opacity-90 px-4 py-2 rounded-lg flex items-center gap-2">
            <DownloadIcon class="w-5 h-5" /> Request
          </button>
          <button class="bg-[#1d2f38] hover:bg-opacity-90 px-3 py-2 rounded-lg">
            <MoreHorizontalIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Cash Flow Section -->
    <div class="bg-white rounded-xl p-6 mb-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2">
          <TrendingDownIcon class="w-5 h-5 text-[#ff7043]" />
          <h2 class="text-xl font-semibold">Cash Flow</h2>
        </div>
        <div class="flex gap-3">
          <button class="bg-gray-100 px-4 py-2 rounded-lg">Weekly</button>
          <button class="px-4 py-2">Daily</button>
          <button class="flex items-center gap-2 px-4 py-2"><SettingsIcon class="w-4 h-4" /> Manage</button>
        </div>
      </div>

      <!-- Income/Expense Stats -->
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-[#2F4858] rounded-lg">
            <TrendingDownIcon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="text-sm text-gray-600">Income</h3>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold">€12.378,20</span>
              <span class="text-green-500 text-sm">45.0% ↑</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-[#4CD080] rounded-lg">
            <TrendingUpIcon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="text-sm text-gray-600">Expense</h3>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold">€5.788,21</span>
              <span class="text-red-500 text-sm">12.5% ↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Cards -->
    <div class="grid grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-4">
          <BuildingIcon class="w-5 h-5 text-[#ff7043]" />
          <h3 class="font-semibold">Business account</h3>
        </div>
        <p class="text-3xl font-bold mb-2">€8.672,20</p>
        <div class="flex items-center text-green-500 text-sm">
          <span>16.0% ↑</span>
        </div>
        <p class="text-sm text-gray-500 mt-2">vs. 7.120,14 Last Period</p>
      </div>

      <div class="bg-white p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-4">
          <PiggyBankIcon class="w-5 h-5 text-[#ff7043]" />
          <h3 class="font-semibold">Total Saving</h3>
        </div>
        <p class="text-3xl font-bold mb-2">€3.765,35</p>
        <div class="flex items-center text-red-500 text-sm">
          <span>8.2% ↓</span>
        </div>
        <p class="text-sm text-gray-500 mt-2">vs. 4.116,50 Last Period</p>
      </div>

      <div class="bg-white p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-4">
          <SaveIcon class="w-5 h-5 text-[#ff7043]" />
          <h3 class="font-semibold">Tax Reserve</h3>
        </div>
        <p class="text-3xl font-bold mb-2">€14.376,16</p>
        <div class="flex items-center text-green-500 text-sm">
          <span>35.2% ↑</span>
        </div>
        <p class="text-sm text-gray-500 mt-2">vs. 10.236,46 Last Period</p>
      </div>
    </div>

    <!-- Recent Activity & Cards Section -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div class="col-span-2 bg-white rounded-xl p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-2">
            <ActivityIcon class="w-5 h-5 text-[#ff7043]" />
            <h2 class="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div class="flex gap-3">
            <button class="flex items-center gap-2"><FilterIcon class="w-4 h-4" /> Filter</button>
            <button class="flex items-center gap-2"><ArrowUpDownIcon class="w-4 h-4" /> Sort</button>
            <button>
              <MoreHorizontalIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Activity Table -->
        <table class="w-full">
          <thead class="text-left text-sm text-gray-500">
            <tr>
              <th class="pb-4">TYPE</th>
              <th class="pb-4">AMOUNT</th>
              <th class="pb-4">STATUS</th>
              <th class="pb-4">METHOD</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr class="border-t">
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <PlusIcon class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="font-medium">Theo Lawrence</p>
                    <p class="text-gray-500 text-xs">Add • Oct 18, 2024</p>
                  </div>
                </div>
              </td>
              <td class="py-4">€500,00<br /><span class="text-xs text-gray-500">120 USD</span></td>
              <td class="py-4"><span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">Success</span></td>
              <td class="py-4">Credit Card<br /><span class="text-gray-500 text-xs">**** 3560</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- My Cards -->
      <div class="bg-white rounded-xl p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-2">
            <CreditCardIcon class="w-5 h-5 text-[#ff7043]" />
            <h2 class="text-xl font-semibold">My Cards</h2>
          </div>
          <button class="text-sm text-gray-500 hover:text-gray-700">See All →</button>
        </div>

        <!-- Card Display -->
        <div class="bg-[#2F4858] text-white p-6 rounded-xl">
          <div class="flex justify-between items-start mb-12">
            <span class="font-bold text-xl">VISA</span>
            <ShipIcon class="w-8 h-8" />
          </div>
          <p class="mb-4 text-lg tracking-wider">**** **** **** 2104</p>
          <p class="text-2xl font-bold">€4.540,20</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  ArrowUpIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  BuildingIcon,
  PiggyBankIcon,
  SaveIcon,
  ActivityIcon,
  FilterIcon,
  ArrowUpDownIcon,
  CreditCardIcon,
  ShipIcon,
} from "lucide-vue-next";
</script>
