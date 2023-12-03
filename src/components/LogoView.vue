<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CustomPopover from './notes-view/CustomPopover.vue'
import TransparentIconButton from './global/TransparentIconButton.vue'
import CustomizableInput from './global/CustomizableInput.vue'
import { useFolderStore } from '@/stores/folder'
import { generateUniqueId } from '@/utilities/helpers'
import type { Folder } from '@/types'
import type { DataAccess } from '@/services/data-access'
import { DataAccessLocalStorageImpl } from '@/services/data-access-localstorage-impl'
import { appConstants } from '@/utilities/consts'

const folderStore = useFolderStore()
const isPopoverActive = ref(false)
const newFolderName = ref('')
const datadataAccessLocalStorageImpl: DataAccess = new DataAccessLocalStorageImpl()

const customStyle = {
  borderRadius: '10px',
  fontSize: 'small'
}

const togglePopoverState = () => {
  isPopoverActive.value = !isPopoverActive.value
}
onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newFolder: Folder = {
        id: generateUniqueId(),
        name: newFolderName.value,
        notes: []
      }
      folderStore.addNewFolder(newFolder)

      datadataAccessLocalStorageImpl
        .post(appConstants.DEFAULT_LOCAL_STORAGE_KEY, folderStore.folders)
        .then(() => {
          console.log('New folder added successfully')
        })
        .catch((error) => {
          console.log('Error while adding new folder', error)
        })

      newFolderName.value = ''

      isPopoverActive.value = false
    }
  })

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
        <p class="folder-create-text-title">Enter folder name</p>
        <p class="folder-create-text-title">
          Press <kbd>Enter</kbd> to save <kbd>Esc</kbd> to cancel
        </p>
        <form class="d-flex">
          <CustomizableInput
            icon="search"
            :customStyle="customStyle"
            placeholder="Folder name"
            v-model="newFolderName"
          />
        </form>
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

.folder-create-text-title {
  @include x-small;
}
</style>
