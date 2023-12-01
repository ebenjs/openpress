<script setup lang="ts">
import { type PropType, computed, ref, onMounted } from 'vue'
import LogoView from './LogoView.vue'
import FolderGroup from './folders-view/FolderGroup.vue'
import type { Folder } from '@/types'
import { generateUniqueId } from '@/utilities/helpers'

const props = defineProps({
  // folders of Notes
  folders: {
    type: Array as PropType<Folder[]>,
    default: () => [
      {
        id: generateUniqueId(),
        name: 'Default folder',
        notes: []
      }
    ]
  }
})

const emit = defineEmits(['selected-folder-change'])

const contextMenuWrapper = ref(null)

const filteredFoldersNoDefault = computed(() => {
  return props.folders.filter((folder) => {
    return !folder.isDefault
  })
})

const filteredFoldersDefault = computed(() => {
  return props.folders.filter((folder) => {
    return folder.isDefault
  })
})

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  contextMenuWrapper.value.style.top = event.clientY + 'px'
  contextMenuWrapper.value.style.left = event.clientX + 'px'
  contextMenuWrapper.value.style.display = 'block'
}

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      contextMenuWrapper.value.style.display = 'none'
    }
  })

  window.addEventListener('click', () => {
    contextMenuWrapper.value.style.display = 'none'
  })
})
</script>

<template>
  <div>
    <LogoView />
    <div class="default-folder-group-wrapper">
      <FolderGroup
        v-for="folder in filteredFoldersDefault"
        :key="folder.id"
        :folder="folder"
        @click="$emit('selected-folder-change', folder.id)"
      />
    </div>
    <div class="context-menu-wrapper" ref="contextMenuWrapper">
      <div class="context-menu">
        <div class="context-menu-item">
          <span>Rename</span>
        </div>
        <div class="context-menu-item">
          <span>Delete</span>
        </div>
      </div>
    </div>
    <FolderGroup
      v-for="folder in filteredFoldersNoDefault"
      :key="folder.id"
      :folder="folder"
      @context-menu="handleContextMenu"
    />
  </div>
</template>

<style lang="scss" scoped>
.default-folder-group-wrapper {
  padding-top: calc($default-box-padding * 1.5);
  padding-bottom: calc($default-box-padding * 1.5);
  border-bottom: solid 1px $default-border-color;
}

.context-menu-wrapper {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  padding-left: calc($default-box-padding * 2);
  padding-right: calc($default-box-padding * 2);
  border-radius: 10px;
  border: solid 1px $default-border-color;
  z-index: 100;
  background-color: $primary-color;

  .context-menu {
    display: flex;
    flex-direction: column;
    color: $white;

    .context-menu-item {
      display: flex;
      align-items: center;
      border-bottom: solid 1px $default-border-color;
      padding: 10px 0;
      cursor: pointer;

      &:hover {
        color: $accent-color;
      }
    }

    .context-menu-item:last-child {
      border-bottom: none;
    }
  }
}
</style>
