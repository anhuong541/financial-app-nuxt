<script lang="ts" setup>
import Modal from "~/components/common/Modal.vue";
import Button from "~/components/common/Button.vue";
import { editHabitModalStore } from "~/stores/globalModals";
import type { HabitsType } from "~/types/habits-table-type";
import Input from "~/components/common/Input.vue";
import TextArea from "~/components/common/TextArea.vue";
import { HABIT_COLORS } from "~/constants";
import { useMutationEditHabit } from "~/libs/vue-query/query-action";
import { useQueryClient } from "@tanstack/vue-query";
import { queryKeys } from "~/libs/vue-query/query-key";

const props = defineProps<{ habit: HabitsType }>();

const editHabitModal = editHabitModalStore();
const queryClient = useQueryClient();
const { mutateAsync: editHabit } = useMutationEditHabit();

const editHabitForm = ref<HabitsType>({ ...props.habit });

const handleSubmitEditNewHabit = () => {
  //  TODO: This is submit is still need to check the condition if the data is changing or not so we can stop handle edit error
  editHabit(
    { habit: editHabitForm.value, habitId: props.habit.id },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.listUserHabits],
        });
        editHabitModal.onClose();
      },
    }
  );
};
</script>

<template>
  <Modal :title="props.habit?.label" modal-id="editHabitModalStore">
    <template #content>
      <div class="flex flex-col gap-4">
        <Input
          id="title"
          type="text"
          title="Title"
          required
          :value="props.habit?.label"
          placeholder="Your habit title"
          @input="editHabitForm.label = $event.target.value"
        />
        <TextArea
          id="desc"
          rows="4"
          title="Description"
          :value="props.habit.description"
          placeholder="Habit description"
          @input="editHabitForm.description = $event.target.value"
        />
        <div>
          <label for="color" class="block text-sm font-medium text-gray-700">Colors</label>
          <div class="mt-1 flex space-x-2 rounded-md shadow-sm">
            <button
              v-for="color in HABIT_COLORS"
              :key="color"
              @click.prevent="editHabitForm.color = color"
              :class="
                cn(
                  'w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500',
                  color === editHabitForm.color && 'ring-coral-600'
                )
              "
              :style="{ backgroundColor: color }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button border="none" variant="destructive" @click.prevent="editHabitModal.onClose"> Delete Habit </Button>
      <Button variant="outline" @click.prevent="editHabitModal.onClose"> Cancel </Button>
      <Button type="submit" @click.prevent="handleSubmitEditNewHabit"> Edit Habit </Button>
    </template>
  </Modal>
</template>
