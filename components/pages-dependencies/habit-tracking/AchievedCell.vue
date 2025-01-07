<script lang="ts" setup>
const { archived, goal } = defineProps<{
  archived: number;
  goal: number;
}>();

const progress = computed(() => Math.min((archived / goal) * 100, 100));
const isCloseToGoal = computed(() => progress.value > 75);

const motivationalMessage = computed(() => {
  if (progress.value === 100) {
    return "You did it! 🎉";
  } else if (progress.value > 75) {
    return "You’re on fire! 🔥";
  } else if (progress.value > 50) {
    return "Halfway there! Keep it up!";
  } else {
    return "";
  }
});
</script>

<template>
  <div class="habit-tracker">
    <div class="bg-gray-300 rounded-md">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="visual-effects font-medium text-xs" :class="{ fire: isCloseToGoal }">
      <p>{{ motivationalMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.habit-tracker {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.progress-bar {
  height: 10px;
  background-color: #f88d30;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.visual-effects {
  margin-top: 5px;
  transition: all 0.5s ease;
}

.visual-effects.fire {
  color: #ff5722;
  text-shadow:
    0 0 10px #ff5722,
    0 0 20px #ff9800;
}
</style>
