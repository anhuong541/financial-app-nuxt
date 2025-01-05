<template>
  <div>
    <h2>Drag and Drop List</h2>
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="item"
      draggable="true"
      @dragstart="onDragStart(index)"
      @dragover.prevent="onDragOver(index)"
      @drop="onDrop(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
]);

const dragSourceIndex = ref(null);

function onDragStart(index) {
  dragSourceIndex.value = index;
}

function onDragOver(index) {
  // Prevent the default to allow dropping
}

function onDrop(targetIndex) {
  const sourceIndex = dragSourceIndex.value;
  if (sourceIndex === null || sourceIndex === targetIndex) return;

  // Swap items in the array
  const draggedItem = items.value[sourceIndex];
  items.value.splice(sourceIndex, 1);
  items.value.splice(targetIndex, 0, draggedItem);

  // Clear the drag source index
  dragSourceIndex.value = null;
}
</script>

<style scoped>
.item {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: move;
  user-select: none;
}

.item:hover {
  background-color: #e0e0e0;
}
</style>
