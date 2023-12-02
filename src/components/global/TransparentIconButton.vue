<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '24px'
  },
  height: {
    type: String,
    default: '24px'
  }
})
</script>

<template>
  <button class="transparent-icon-button" :style="{ width, height }">
    <span class="material-symbols-outlined">
      {{ icon }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.transparent-icon-button {
  padding: 0;
  margin: 0;
  line-height: 0;
  background-color: transparent;
  border: none;
  color: $dull-white;
}
</style>
