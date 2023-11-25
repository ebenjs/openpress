import type { Folder, Note } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFolderStore = defineStore('folder', () => {
  const folders = ref<Folder[]>([])
  const currentFolderId = ref(0)
  const currentNote = ref<Note | null>(null)

  function changeCurrentSelectedNote(note: Note) {
    currentNote.value = note
  }

  function changeCurrentFolderId(id: number) {
    currentFolderId.value = id
  }

  function addNewFolder(folder: Folder) {
    folders.value.push(folder)
  }

  function addNewNoteToFolder(note: Note) {
    folders.value[currentFolderId.value].notes.push(note)
  }

  return {
    currentNote,
    changeCurrentSelectedNote,
    folders,
    currentFolderId,
    changeCurrentFolderId,
    addNewFolder,
    addNewNoteToFolder
  }
})
