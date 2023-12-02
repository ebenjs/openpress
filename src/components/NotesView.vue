<script setup lang="ts">
import { type PropType, onMounted, computed } from 'vue'
import useTextFormatter from '../utilities/text-formatter.vue'
import useDateHelper from '../utilities/date-helper.vue'
import type { Note } from '@/types'
import { useFolderStore } from '@/stores/folder'
import { DefaultFoldersIds } from '@/utilities/consts'

const folderStore = useFolderStore()

defineProps({
  notes: {
    type: Array as PropType<Note[]>,
    required: true
  }
})

const emit = defineEmits(['folder-store-updated'])

const { capitalizeFirstChar } = useTextFormatter()
const { formatDate } = useDateHelper()

const isArchived = computed(() => {
  return folderStore.getCurrentFolder().id === DefaultFoldersIds.archiveFolderId
})

const computeNoteTitle = (note: Note) => {
  if (note.data.blocks.length > 0) {
    if (note.data.blocks[0].data.text !== '') {
      return note.data.blocks[0].data.text
    }
  }
  return 'Untitled'
}

const computeNoteDescription = (note: Note) => {
  if (note.data.blocks.length > 1) {
    if (note.data.blocks[1].type === 'paragraph' || note.data.blocks[1].type === 'header') {
      return note.data.blocks[1].data.text
    }
  }
  return 'No description'
}

const computeNoteClasses = (note: Note) => {
  let finalClass = 'item-content d-flex'
  if (note === folderStore.currentNote) {
    finalClass += ' active'
  }
  return finalClass
}

const handleNoteClick = (note: Note) => {
  folderStore.changeCurrentSelectedNote(note)
  note.isRead = true
  folderStore.updateLocalStorage()
}

const archiveNote = (note: Note) => {
  if (folderStore.deleteNoteFromCurrentFolder(note.id)) {
    folderStore.addNoteToArchiveFolder(note)
    folderStore.updateLocalStorage()
    emit('folder-store-updated')
  }
}

const unArchiveNote = (note: Note) => {
  if (folderStore.deleteNoteFromCurrentFolder(note.id)) {
    folderStore.addNewNoteToFolder(DefaultFoldersIds.allNotesFolderId, note)
    folderStore.updateLocalStorage()
    emit('folder-store-updated')
  }
}

const starNote = (note: Note) => {
  note.isStarred = !note.isStarred
  folderStore.updateLocalStorage()
  emit('folder-store-updated')
}

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      folderStore.changeCurrentSelectedNote(null)
    }
  })
})
</script>

<template>
  <div v-for="note in notes" :key="note.id">
    <div :class="computeNoteClasses(note)" @click="handleNoteClick(note)">
      <div>
        <p class="item-title">{{ capitalizeFirstChar(computeNoteTitle(note)) }}</p>
        <p class="item-description">{{ computeNoteDescription(note) }}</p>
        <small class="item-meta">
          <span class="item-meta-item d-flex align-items-center pt-2">
            <span class="author-picture">
              <img src="https://picsum.photos/200" alt="avatar" />
            </span>
            <span class="ms-1"
              >By : ebenjs on {{ formatDate(note.createdAt, 'DD-MM-YYYY HH:mm:ss') }}</span
            >
          </span>
        </small>
      </div>

      <div class="note-indicators ms-auto">
        <span v-if="note.isStarred" class="material-symbols-outlined">editor_choice</span>
      </div>

      <div class="folder-actions">
        <div class="d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined star ms-2" @click.stop="starNote(note)"
            >editor_choice</span
          >

          <span
            v-if="!isArchived"
            @click.stop="archiveNote(note)"
            class="material-symbols-outlined archive ms-2"
            >archive</span
          >
          <span
            v-else
            @click.stop="unArchiveNote(note)"
            class="material-symbols-outlined archive ms-2"
            >unarchive</span
          >

          <span class="material-symbols-outlined remove ms-2">delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$padding: 15px;

.item-content {
  padding: $padding;
  padding-left: calc($padding - 4px);
  border-left: solid 4px transparent;
  cursor: pointer;

  .folder-actions {
    padding: calc($default-box-padding/1.5) calc($default-box-padding);
    border-radius: calc($default-radius * 2);
    display: none !important;
    position: absolute;
    margin-left: 14.8%;
    background-color: $primary-color;
    // background-color: $accent-color;
    // color: $primary-color;
    @include highlight-box-shadow;

    .material-symbols-outlined {
      @include icons-small;
    }
  }

  &:hover {
    background-color: $hover-color-primary;

    .folder-actions {
      display: flex !important;
    }
  }

  p {
    margin: 0;
  }

  .item-title {
    color: $white;
    @include small;
  }

  .item-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 4px;
    @include x-small;
  }

  .item-meta {
    @include xx-small;
  }

  .author-picture {
    img {
      width: 20px;
      height: 20px;
      border: solid 1px $white;
      border-radius: 50%;
    }
  }
}

.active {
  background-color: $hover-color-primary;
  border-left-color: $accent-color;

  .item-title {
    color: $accent-color;
  }
}
</style>
