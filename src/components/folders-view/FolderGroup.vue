<script setup lang="ts">
import type { Folder } from '@/types'
import { ref, type PropType } from 'vue'
import { useFolderStore } from '@/stores/folder'

const folderStore = useFolderStore()
const props = defineProps({
  folder: {
    type: Object as PropType<Folder>,
    required: true
  }
})

const emit = defineEmits(['context-menu'])

const applyCorrectClass = (folder: Folder) => {
  let finalClass = 'folder-group'
  if (folder.id === folderStore.currentFolderId) {
    finalClass += ' active'
  }
  if (!folder.isDefault) {
    finalClass += ' not-default-folder'
  }
  return finalClass
}

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  emit('context-menu', event)
}
</script>

<template>
  <div :class="applyCorrectClass(folder)" @contextmenu.prevent="handleContextMenu">
    <div class="folder-group-header d-flex align-items-center">
      <span
        class="folder-icon material-symbols-outlined"
        :style="
          folder.background
            ? `${folder.background};-webkit-text-fill-color: transparent;
    -webkit-background-clip: text;`
            : ''
        "
      >
        {{ folder.icon ?? 'folder' }}
      </span>
      <span class="folder-group-content w-100 d-flex align-items-center">
        <span>
          {{ folder.name }}
        </span>
        <span
          v-if="folder.notes.length > 0"
          class="badge rounded-pill background-accen-darken ms-auto"
        >
          {{ folder.notes.length }}
        </span>
        <!-- edit and delete icons -->
        <div v-if="!folder.isDefault" class="folder-actions ms-auto">
          <span class="material-symbols-outlined edit">edit_square</span>
          <span class="material-symbols-outlined remove ms-2">cancel</span>
        </div>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folder-group {
  padding: $default-box-padding;
  cursor: pointer;

  &:hover {
    background-color: $hover-color-primary;

    .folder-actions {
      display: block;
    }
  }

  .folder-group-header {
    @include small;
  }

  .folder-group-content {
    padding-left: 10px;
    color: $white;
    @include small;
  }
}

.not-default-folder {
  .folder-group-content {
    min-height: 30px;
  }
}

.active {
  background-color: $hover-color-primary;
  border-left-color: $accent-color;

  .folder-group-content {
    color: $accent-color;
  }
}

.folder-actions {
  display: none;

  .material-symbols-outlined {
    @include large;
  }

  .edit {
    color: $accent-color;
  }

  .remove {
    color: $danger-color-1;
  }
}
</style>
