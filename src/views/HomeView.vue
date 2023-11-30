<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FoldersView from '@/components/FoldersView.vue'
import NotesView from '@/components/NotesView.vue'
import ActionBar from '@/components/notes-view/ActionBar.vue'
import FolderBar from '@/components/notes-view/FolderBar.vue'
import EditorView from '@/components/EditorView.vue'
import NoNoteSelected from '@/components/notes-view/NoNoteSelected.vue'
import { DataAccessLocalStorageImpl } from '@/services/data-access-localstorage-impl'
import { type DataAccess } from '@/services/data-access'
import { appConstants } from '@/utilities/consts'
import { generateUniqueId } from '@/utilities/helpers'
import { useFolderStore } from '@/stores/folder'
import type { FilterOptions, Folder, Note } from '@/types'

const folderStore = useFolderStore()
const foldersCopy = ref<Folder[]>(folderStore.folders)
const datadataAccessLocalStorageImpl: DataAccess = new DataAccessLocalStorageImpl()

const handleSearchTextChanged = (value: string) => {
  foldersCopy.value = folderStore.folders

  foldersCopy.value = folderStore.folders.map((folder: Folder) => {
    return {
      ...folder,
      notes: folder.notes.filter((note) => {
        if (note.data.blocks.length === 0) return true
        return note.data.blocks[0].data.text.toLowerCase().includes(value.toLowerCase())
      })
    }
  })
}

const handleSelectedFolderChange = (folderId: number) => {
  folderStore.currentFolderId = folderId
  handleFilterOptionsChanged({ read: true, unread: true })
  folderStore.currentNote = null
}

const handleFilterOptionsChanged = (filterOptions: FilterOptions) => {
  foldersCopy.value = folderStore.folders

  foldersCopy.value = folderStore.folders.map((folder: Folder) => {
    return {
      ...folder,
      notes: folder.notes.filter((note) => {
        if (filterOptions.read && filterOptions.unread) {
          return true
        } else if (filterOptions.read) {
          return note.isRead
        } else if (filterOptions.unread) {
          return !note.isRead
        }
      })
    }
  })
}

const handleAddNote = () => {
  const newNote: Note = {
    id: generateUniqueId(),
    data: {
      blocks: []
    },
    isRead: false,
    createdAt: '2021-08-01T00:00:00.000Z'
  }

  if (!(foldersCopy.value.length > 0)) {
    foldersCopy.value = appConstants.DEFAULT_FOLDERS
  }

  foldersCopy.value = foldersCopy.value.map((folder) => {
    if (folder.id === folderStore.currentFolderId) {
      return {
        ...folder,
        notes: [newNote, ...folder.notes]
      }
    } else {
      return folder
    }
  })

  datadataAccessLocalStorageImpl
    .post<Folder[]>(appConstants.DEFAULT_LOCAL_STORAGE_KEY, foldersCopy.value)
    .then(() => {
      folderStore.folders = foldersCopy.value
    })
    .catch((error) => {
      console.log(error)
    })
}

const handleNoteEdited = (note: Note) => {
  folderStore.folders = folderStore.folders.map((folder) => {
    if (folder.id === folderStore.currentFolderId) {
      return {
        ...folder,
        notes: folder.notes.map((folderNote) => {
          if (folderNote.id === note.id) {
            return note
          } else {
            return folderNote
          }
        })
      }
    } else {
      return folder
    }
  })

  datadataAccessLocalStorageImpl
    .post<Folder[]>(appConstants.DEFAULT_LOCAL_STORAGE_KEY, folderStore.folders)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  datadataAccessLocalStorageImpl
    .get<Folder[]>(appConstants.DEFAULT_LOCAL_STORAGE_KEY)
    .then((receivedFolders) => {
      folderStore.folders = receivedFolders
      foldersCopy.value = receivedFolders
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="d-flex h-100">
    <div class="h-100 first-pane">Hi</div>
    <div class="h-100 flex-grow-1">
      <div class="row h-100 g-0">
        <div class="col-lg-2 h-100 second-pane">
          <FoldersView
            :folders="folderStore.folders"
            @selected-folder-change="handleSelectedFolderChange"
          />
        </div>
        <div class="col-lg-3 h-100 third-pane scroll-overflow">
          <div v-if="folderStore.folders[folderStore.currentFolderId]?.notes.length > 0">
            <FolderBar
              :label="foldersCopy[folderStore.currentFolderId].name"
              :total="foldersCopy[folderStore.currentFolderId]?.notes.length"
            />
            <ActionBar
              @search-text-changed="handleSearchTextChanged"
              @filter-options-changed="handleFilterOptionsChanged"
              @add-note="handleAddNote"
            />
            <NotesView
              v-if="foldersCopy[folderStore.currentFolderId]?.notes.length > 0"
              :notes="foldersCopy[folderStore.currentFolderId]?.notes"
            />
            <p v-else class="px-3 py-2">No result</p>
          </div>
          <div
            v-else
            class="no-notes-wrapper d-flex flex-column justify-content-center align-items-center h-100"
          >
            <span class="material-symbols-outlined text-center text-white" style="font-size: 100px">
              folder_open
            </span>
            <p class="px-4 text-center">The selected folder looks empty. Please add some notes.</p>
            <div class="d-flex justify-content-center">
              <button class="custom-button" @click="handleAddNote">Add note</button>
            </div>
          </div>
        </div>
        <div class="col-lg-7 h-100 fourth-pane">
          <EditorView
            v-if="folderStore.currentNote"
            :note="folderStore.currentNote"
            @note-edited="handleNoteEdited"
          />
          <NoNoteSelected v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.first-pane {
  background-color: $tertiary-color;
  width: 6%;
}

.second-pane {
  background-color: $secondary-color;
  @include default-border-rigth;
  @include default-border-left;
}

.third-pane,
.fourth-pane {
  background-color: $primary-color;
}

.third-pane {
  @include default-border-rigth;

  .no-notes-wrapper {
    @include medium;
  }

  .custom-button {
    @include small;
    @include bold;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      outline: 0;
      background: $button-color-1-hover;
      color: $hover-color-primary;
    }
  }
}
</style>
@/stores/folders
