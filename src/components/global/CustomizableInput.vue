<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'

interface TransitionOptions {
  property: string
  value: string
}

interface InputStyle {
  borderRadius: string
  fontSize: string
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object as PropType<InputStyle>,
    default: () => ({})
  },
  isInputGroup: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  activateTransition: {
    type: [Object, Boolean] as PropType<TransitionOptions | false>,
    default: false
  }
})

defineEmits(['update:modelValue'])

const isActive = ref(false)

const computeClass = computed(() => {
  let finalClass = 'custom-input'
  if (props.customStyle.fontSize) {
    finalClass += ' custom-input-font-' + props.customStyle.fontSize
  }
  if (props.activateTransition) {
    finalClass += ' custom-input-transition'
  }
  return finalClass
})

const computeStyle = computed(() => {
  let computedStyle = {
    ...props.customStyle
  }

  if (!props.activateTransition) {
    return computedStyle
  }

  const { property, value } = props.activateTransition
  if (isActive.value) {
    computedStyle = {
      ...computedStyle,
      [property]: value
    }
  }

  return computedStyle
})
</script>

<template>
  <span class="w-100">
    <div v-if="isInputGroup" class="input-group d-flex justify-content-end">
      <span class="input-group-text" id="basic-addon1">
        <span class="material-symbols-outlined"> {{ icon }} </span>
      </span>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        :class="computeClass"
        :style="computeStyle"
        :placeholder="placeholder"
        aria-describedby="basic-addon1"
        @focus="isActive = true"
        @blur="isActive = false"
      />
    </div>

    <div v-else class="d-flex w-100 justify-content-end">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        :class="computeClass"
        :style="computeStyle"
        :placeholder="placeholder"
        @focus="isActive = true"
        @blur="isActive = false"
      />
    </div>
  </span>
</template>

<style lang="scss" scoped>
.input-group {
  .input-group-text {
    background-color: $secondary-color;
    border: solid 1px $default-border-color;
    border-right: none;
    border-radius: 20px;
    color: $dull-white;
  }

  .custom-input {
    padding: 4px 5px 4px 0px;
    width: 50%;
  }
}

.custom-input {
  padding: 8px 2px 8px 10px;
  width: 100%;
  border: solid 0.1px $default-border-color;
  border-left: none;
  border-radius: 20px;
  background-color: $secondary-color;
  color: $white;
  outline: none;
  @include small;

  &::placeholder {
    color: $dull-white;
  }
}

.custom-input-transition {
  transition: width 0.3s;
}

.custom-input-font-small {
  @include small;
}

.custom-input-font-x-small {
  @include x-small;
}
</style>
