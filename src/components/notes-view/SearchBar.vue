<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-group d-flex justify-content-end">
    <span class="input-group-text" id="basic-addon1">
      <span class="material-symbols-outlined"> search </span>
    </span>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="search-input"
      placeholder="Search..."
      aria-describedby="basic-addon1"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-group-text {
  background-color: $secondary-color;
  border: solid 1px $default-border-color;
  border-right: none;
  border-radius: 20px;
  color: $dull-white;
}

.search-input {
  padding: 4px 5px 4px 0px;
  border: solid 0.1px $default-border-color;
  border-left: none;
  border-radius: 20px;
  background-color: $secondary-color;
  width: 50%;
  transition: width 0.3s;
  @include small;

  &::placeholder {
    color: $dull-white;
  }

  &:focus {
    width: 80%;
  }

  color: $white;
  outline: none;
}
</style>
