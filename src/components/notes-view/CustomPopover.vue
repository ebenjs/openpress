<script setup lang="ts">
defineProps({
  minWidth: {
    type: Number,
    default: 150
  },
  maxWidth: {
    type: Number,
    default: 150
  }
})
</script>

<template>
  <div class="custom-popover" :style="`min-width: ${minWidth}px; max-width: ${maxWidth}px`">
    <div class="custom-popover-body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-popover {
  position: absolute;
  z-index: 1000;
  background-color: $quaternary-color;
  border-radius: 10px;
  border: none;
  @include default-box-shadow;

  .custom-popover-body {
    background-color: $quaternary-color;
    color: $dull-white;
    border-radius: 10px;
    border: none;
    padding: 10px;
  }
}
</style>
