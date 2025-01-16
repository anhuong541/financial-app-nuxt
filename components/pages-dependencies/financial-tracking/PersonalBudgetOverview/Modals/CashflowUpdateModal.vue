<script lang="ts" setup>
import { Banknote, ChevronDownIcon } from "lucide-vue-next";
import Button from "~/components/common/Button.vue";
import Dropdown from "~/components/common/Dropdown.vue";
import Input from "~/components/common/Input.vue";
import Modal from "~/components/common/Modal.vue";
import TextArea from "~/components/common/TextArea.vue";
import { CATEGORIES, type CategoryKey } from "~/constants";
import { cashflowUpdateModalStore } from "~/stores/globalModals";

const { onChangeModal, onClose } = cashflowUpdateModalStore();
const categories = ref<any[]>([]);

const typeNewMoneyLog = ref<{
  category: CategoryKey | null;
  amount: number;
  name: string;
  note: string;
  ispaid: boolean;
  color: string;
}>({
  amount: 0,
  name: "",
  category: null,
  note: "",
  ispaid: false,
  color: "",
});

const selectedCategory = computed(() => {
  if (!typeNewMoneyLog.value.category) {
    return "Cagtegory";
  }
  return CATEGORIES[typeNewMoneyLog.value.category]?.label ?? "Cagtegory";
});

watch(typeNewMoneyLog, (val) => {
  console.log({ val });
});

const createOptions = () => {
  const keys = Object.keys(CATEGORIES) as CategoryKey[];
  keys.forEach((key) => {
    const category = CATEGORIES[key];
    const categoryId = key;
    categories.value.push({
      categoryId,
      ...category,
    });
  });
};
createOptions();

const handleSubmitCashflow = () => {};
</script>

<template>
  <Modal title="Financial Update" modal-id="cashflowUpdateModalStore">
    <template #trigger>
      <Button @click="onChangeModal"> <Banknote class="h-4 w-4" /> Update Budget </Button>
    </template>
    <template #content>
      <div class="flex flex-col space-y-4">
        <div>
          <div class="flex items-center justify-between">
            <label for="categoy" class="flex items-center gap-1 text-sm font-medium text-gray-700">
              Category <span class="text-red-500 font-bold text-xl">*</span>
            </label>
          </div>

          <div class="mt-1 relative rounded-md shadow-sm">
            <Dropdown :options="categories">
              <template #trigger="{ toggleDropdown, isOpen }">
                <button
                  @click="toggleDropdown"
                  class="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                  :aria-expanded="isOpen"
                  aria-haspopup="true"
                >
                  <div class="w-5 h-5 bg-[#FF7155] rounded"></div>
                  <span class="flex-1 text-left text-gray-900 text-sm whitespace-nowrap font-medium">
                    {{ selectedCategory }}
                  </span>
                  <ChevronDownIcon
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'transform rotate-180': isOpen }"
                  />
                </button>
              </template>
              <template #item="{ data, closeDropdown }">
                <div
                  :key="data.label"
                  class="w-full px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  @click="
                    {
                      typeNewMoneyLog.category = data.categoryId;
                      closeDropdown();
                    }
                  "
                >
                  <div class="w-5 h-5 rounded flex-shrink-0" :style="{ backgroundColor: data.color }" />
                  <p>
                    {{ data.label }}
                  </p>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <Input
          id="amount-money"
          type="number"
          title="Amount"
          required
          placeholder="Amount VND"
          v-model="typeNewMoneyLog.name"
          @input="typeNewMoneyLog.name = $event.target.value"
        />
        <Input
          id="name-money"
          type="text"
          title="Name"
          required
          placeholder="Name"
          v-model="typeNewMoneyLog.name"
          @input="typeNewMoneyLog.name = $event.target.value"
        />
        <TextArea
          id="note-money"
          type="text"
          title="Note"
          required
          placeholder="Note"
          v-model="typeNewMoneyLog.name"
          @input="typeNewMoneyLog.name = $event.target.value"
        />
      </div>
    </template>
    <template #footer>
      <Button variant="outline" @click.prevent="onClose"> Close </Button>
      <Button type="submit" @click.prevent="handleSubmitCashflow"> Add Habit </Button>
    </template>
  </Modal>
</template>
