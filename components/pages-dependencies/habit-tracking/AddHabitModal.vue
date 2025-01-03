<template>
  <Modal title="Create New Habit" modal-id="addHabitModalStore" label="New Habit" :button-icon="Plus">
    <template #content>
      <div class="flex flex-col gap-4">
        <Input
          id="title"
          type="text"
          :icon="Heading"
          title="Title"
          required
          placeholder="Your habit title"
          v-model="addNewHabitForm.title"
        />
        <TextArea
          id="desc"
          rows="4"
          :icon="FileText"
          title="Description"
          placeholder="Habit description"
          v-model="addNewHabitForm.desc"
        />
        <Input
          id="monthly-goal"
          type="number"
          :icon="Target"
          title="Monthly Goal"
          required
          v-model="addNewHabitForm.goal"
          placeholder="1"
        />
        <Input id="tag" type="text" :icon="Tag" title="Tag" placeholder="#habit-tag" v-model="addNewHabitForm.tag" />
        <div>
          <label for="color" class="block text-sm font-medium text-gray-700">Colors</label>

          <div class="mt-1 flex space-x-2 rounded-md shadow-sm">
            <button
              v-for="color in colors"
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
      </div>
    </template>
    <template #footer>
      <Button variant="outline" @click="addHabitModal.onClose"> Cancel </Button>
      <Button type="submit" @click="() => {}"> Continue </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { FileText, Heading, Plus, Tag, Target } from "lucide-vue-next";
import Button from "~/components/common/Button.vue";
import Input from "~/components/common/Input.vue";
import Modal from "~/components/common/Modal.vue";
import TextArea from "~/components/common/TextArea.vue";
import { addHabitModalStore } from "~/stores/globalModals";

const addHabitModal = addHabitModalStore();

const addNewHabitForm = ref({
  title: "",
  desc: "",
  goal: "",
  tag: "",
  color: "#3B82F6",
});

const colors = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
];
</script>
