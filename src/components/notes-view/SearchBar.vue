<script setup lang="ts">
import CustomizableInput from '@/components/global/CustomizableInput.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const transitionOptions = {
  property: 'width',
  value: '78%'
}
</script>

<template>
  <CustomizableInput
    :isInputGroup="true"
    icon="search"
    :activateTransition="transitionOptions"
    placeholder="Search..."
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>

<style lang="scss" scoped></style>
