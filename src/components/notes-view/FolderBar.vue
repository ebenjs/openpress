<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Default folder'
  },
  total: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="d-flex align-items-center folder-bar">
    <span class="material-symbols-outlined"> folder </span>
    <p class="folder-name">
      {{ label }}
    </p>
    <span class="badge rounded-pil background-accent-darken ms-auto" v-if="total > 0">
      {{ `${total} item${total > 1 ? 's' : ''}` }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.folder-bar {
  padding: 10px;
  border-bottom: solid 1px $default-border-color;

  .folder-name {
    margin: 0;
    padding-left: 10px;
    color: $white;
    @include medium;
  }
}
</style>
