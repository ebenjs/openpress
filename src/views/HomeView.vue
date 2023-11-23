<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FoldersView from '@/components/FoldersView.vue';
import NotesView from '@/components/NotesView.vue';
import ActionBar from '@/components/notes-view/ActionBar.vue';
import FolderBar from '@/components/notes-view/FolderBar.vue';
import EditorView from '@/components/EditorView.vue';
import { DataAccessLocalStorageImpl } from '@/services/data-access-localstorage-impl';
import { type DataAccess } from '@/services/data-access';
import { appConstants } from '@/utilities/consts';

const folders = ref<Folder[]>([])
const foldersCopy = ref<Folder[]>([])
const currentFolderId = ref(0)
const currentNote = ref<Note | null>(null)

const handleSearchTextChanged = (value: string) => {
  foldersCopy.value = folders.value.map((folder) => {
    return {
      ...folder,
      notes: folder.notes.filter((note) => {
        return note.title.toLowerCase().includes(value.toLowerCase())
      }),
    }
  })
}

const handleSelectedFolderChange = (folderId: number) => {
  currentFolderId.value = folderId
  handleFilterOptionsChanged({ read: true, unread: true })
  currentNote.value = null
}

const handleFilterOptionsChanged = (filterOptions: FilterOptions) => {
  foldersCopy.value = folders.value.map((folder) => {
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
      }),
    }
  })
}

const handleActiveNoteChanged = (note: Note) => {
  console.log(note)
  currentNote.value = note
}

onMounted(() => {
  const datadataAccessLocalStorageImpl: DataAccess = new DataAccessLocalStorageImpl();

  datadataAccessLocalStorageImpl.get<Folder[]>(appConstants.DEFAULT_LOCAL_STORAGE_KEY).then((receivedFolders) => {
    folders.value = receivedFolders
    foldersCopy.value = receivedFolders
  }).catch((error) => {
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
          <FoldersView :folders="folders" @selected-folder-change="handleSelectedFolderChange" />
        </div>
        <div class="col-lg-3 h-100 third-pane scroll-overflow">
          <div v-if="(folders[currentFolderId]?.notes.length > 0)">
            <FolderBar label="Default folder" :total="foldersCopy[currentFolderId]?.notes.length" />
            <ActionBar @search-text-changed="handleSearchTextChanged"
              @filter-options-changed="handleFilterOptionsChanged" />
            <NotesView v-if="foldersCopy[currentFolderId]?.notes.length > 0" :notes="foldersCopy[currentFolderId]?.notes"
              @active-note-changed="handleActiveNoteChanged" />
            <p v-else class="px-3 py-2">No result</p>
          </div>
          <div v-else class="no-notes-wrapper d-flex flex-column justify-content-center align-items-center h-100">
            <span class="material-symbols-outlined text-center text-white" style="font-size: 100px">
              folder_open
            </span>
            <p class="px-4 text-center">
              The selected folder looks empty. Please add some notes.
            </p>
            <div class="d-flex justify-content-center">
              <button class="custom-button">Add note</button>
            </div>
          </div>
        </div>
        <div class=" col-lg-7 h-100 fourth-pane">
          <EditorView v-if="currentNote" :note="currentNote" />
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
