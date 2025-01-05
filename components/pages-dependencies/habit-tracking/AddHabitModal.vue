<script lang="ts" setup>
import { useQueryClient } from "@tanstack/vue-query";
import { Plus } from "lucide-vue-next";
import Button from "~/components/common/Button.vue";
import Input from "~/components/common/Input.vue";
import Modal from "~/components/common/Modal.vue";
import TextArea from "~/components/common/TextArea.vue";
import { useMutationAddNewHabit } from "~/libs/vue-query/query-action";
import type { AddHabitForm, HabitsType } from "~/types/habits-table-type";
import { addHabitModalStore } from "~/stores/globalModals";
import { queryKeys } from "~/libs/vue-query/query-key";
import { HABIT_COLORS } from "~/constants";

const props = defineProps<{
  habits: HabitsType[];
}>();

const queryClient = useQueryClient();
const addHabitModal = addHabitModalStore();

const order = computed(() => props.habits.length + 1);
const { mutateAsync: addNewHabit } = useMutationAddNewHabit();

const addNewHabitForm = ref<AddHabitForm>({
  label: "",
  description: "",
  // goal: "",
  tag: "",
  color: "#3B82F6",
  category: [""],
  order: order.value,
});

watch(order, (val) => {
  addNewHabitForm.value.order = val;
});

const handleSubmitAddNewHabit = () => {
  addNewHabit(addNewHabitForm.value, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.listUserHabits],
      });
      addHabitModal.onClose();
    },
  });
};
</script>

<template>
  <Modal title="Create New Habit" modal-id="addHabitModalStore">
    <template #trigger>
      <Button @click="addHabitModal.onChangeModal"> <Plus class="h-4 w-4" /> New Habit </Button>
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <Input
          id="title"
          type="text"
          title="Title"
          required
          placeholder="Your habit title"
          v-model="addNewHabitForm.label"
          @input="addNewHabitForm.label = $event.target.value"
        />
        <TextArea
          id="desc"
          rows="4"
          title="Description"
          placeholder="Habit description"
          v-model="addNewHabitForm.description"
          @input="addNewHabitForm.description = $event.target.value"
        />
        <div>
          <label for="color" class="block text-sm font-medium text-gray-700">Colors</label>
          <div class="mt-1 flex flex-wrap gap-2 rounded-md shadow-sm">
            <button
              v-for="color in HABIT_COLORS"
              :key="color"
              @click.prevent="addNewHabitForm.color = color"
              :class="
                cn(
                  'w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500',
                  color === addNewHabitForm.color && 'ring-coral-600'
                )
              "
              :style="{ backgroundColor: color }"
            />
          </div>
        </div>
        <!-- 
        <Input
          id="monthly-goal"
          type="number"
          title="Monthly Goal"
          required
          v-model="addNewHabitForm.goal"
          placeholder="1"
        />
        <Input id="tag" type="text" title="Tag" placeholder="#habit-tag" v-model="addNewHabitForm.tag" />
        <Input id="category" type="text" title="Category" placeholder="Heatlh" v-model="addNewHabitForm.category" />
         -->
      </div>
    </template>
    <template #footer>
      <Button variant="outline" @click.prevent="addHabitModal.onClose"> Cancel </Button>
      <Button type="submit" @click.prevent="handleSubmitAddNewHabit"> Add Habit </Button>
    </template>
  </Modal>
</template>
