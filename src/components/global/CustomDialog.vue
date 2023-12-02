<script setup lang="ts">
defineEmits(['close-dialog'])
</script>

<template>
  <div class="custom-dialog">
    <div class="custom-dialog-header">
      <slot name="header"></slot>
      <span class="material-symbols-outlined close ms-auto" @click="$emit('close-dialog')"
        >cancel</span
      >
    </div>
    <div class="custom-dialog-body">
      <slot name="body"></slot>
    </div>
    <div class="custom-dialog-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-dialog {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -150%);
  background-color: $quaternary-color;
  border-radius: $default-radius;
  width: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  @include default-box-shadow;

  .custom-dialog-header,
  .custom-dialog-body,
  .custom-dialog-footer {
    padding: $default-box-padding calc($default-box-padding * 2);
  }

  .custom-dialog-header {
    display: flex;
    border-bottom: solid 1px $default-border-color;
    @include medium;

    .close {
      cursor: pointer;
    }
  }

  .custom-dialog-footer {
    padding-bottom: calc($default-box-padding * 2);
  }
}
</style>
