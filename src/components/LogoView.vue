<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CustomPopover from './notes-view/CustomPopover.vue'
import TransparentIconButton from './global/TransparentIconButton.vue'

const isPopoverActive = ref(false)
const folderName = ref('')

const togglePopoverState = () => {
  isPopoverActive.value = !isPopoverActive.value
}
onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      isPopoverActive.value = false
    }
  })

  window.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.logo-wrapper')) {
      isPopoverActive.value = false
    }
  })
})
</script>

<template>
  <div class="logo-wrapper py-2 d-flex align-items-center">
    <img src="../assets/images/edit-write-2.svg" alt="logo" class="logo" />
    <span class="logo-text">Open Press</span>
    <div class="folder-create-wrapper d-flex flex-fill justify-content-end">
      <TransparentIconButton icon="create_new_folder" @click="togglePopoverState" />
      <CustomPopover v-if="isPopoverActive">
        <p class="filter-title">Enter folder name</p>
        <div class="form-check">
          <input v-model="folderName" class="form-control" type="text" />
        </div>
      </CustomPopover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  padding: 10px;
  border-bottom: solid 1px $default-border-color;

  .logo {
    width: 30px;
  }

  .logo-text {
    margin: 0;
    padding-left: 10px;
    color: $white;
    @include medium;
  }
}
</style>
