<script lang="ts" setup>
import Modal from "~/components/common/Modal.vue";
import Button from "~/components/common/Button.vue";
import { editHabitModalStore } from "~/stores/globalModals";
import type { HabitsType } from "~/types/habits-table-type";
import Input from "~/components/common/Input.vue";
import TextArea from "~/components/common/TextArea.vue";
import { HABIT_COLORS } from "~/constants";
import { useMutationDeleteHabit, useMutationEditHabit } from "~/libs/vue-query/query-action";
import { useMyHabitsStore } from "~/stores/habits";

const { $lodash } = useNuxtApp();

const editHabitModal = editHabitModalStore();
const { $state, updateHabit, deleteHabit: deleteHabitClient } = useMyHabitsStore();
const { mutateAsync: editHabit } = useMutationEditHabit();
const { mutateAsync: deleteHabit } = useMutationDeleteHabit();

const editHabitForm = computed<HabitsType>(() => ({ ...$state.selectedHabit }));

const handleSubmitEditHabit = async () => {
  //  TODO: This is submit is still need to check the condition if the data is changing or not so we can stop handle edit error
  // i thing we should use validation library to handle before submit for: learn to handle validate on vue with solve the problem above
  if ($lodash.isEqual(editHabitForm.value, $state.selectedHabit)) {
    editHabitModal.onClose();
    return;
  }
  await editHabit(
    { habit: editHabitForm.value, habitId: $state.selectedHabit.id },
    {
      onSuccess: () => {
        updateHabit(editHabitForm.value);
        editHabitModal.onClose();
      },
    }
  );
};

const handleDeleteHabit = async () => {
  await deleteHabit($state.selectedHabit.id, {
    onSuccess: () => {
      deleteHabitClient();
      editHabitModal.onClose();
    },
  });
};
</script>

<template>
  <Modal :title="$state.selectedHabit?.label" modal-id="editHabitModalStore">
    <template #content>
      <div class="flex flex-col gap-4">
        <Input
          id="title"
          type="text"
          title="Title"
          required
          :value="$state.selectedHabit?.label"
          placeholder="Your habit title"
          @input="editHabitForm.label = $event.target.value"
        />
        <TextArea
          id="desc"
          rows="4"
          title="Description"
          :value="$state.selectedHabit.description"
          placeholder="Habit description"
          @input="editHabitForm.description = $event.target.value"
        />
        <Input
          id="monthly-goal"
          type="number"
          title="Monthly Goal"
          required
          v-model="editHabitForm.goal"
          :value="$state.selectedHabit.goal"
          @input="editHabitForm.goal = $event.target.value"
          placeholder="15"
        />
        <div>
          <label for="color" class="block text-sm font-medium text-gray-700">Colors</label>
          <div class="mt-1 flex flex-wrap gap-2 rounded-md shadow-sm">
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
      <Button border="none" variant="destructive" @click.prevent="handleDeleteHabit"> Delete Habit </Button>
      <Button variant="outline" @click.prevent="editHabitModal.onClose"> Cancel </Button>
      <Button type="submit" @click.prevent="handleSubmitEditHabit"> Edit Habit </Button>
    </template>
  </Modal>
</template>
