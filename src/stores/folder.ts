import type { Folder, Note } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DataAccessLocalStorageImpl } from '@/services/data-access-localstorage-impl'
import type { DataAccess } from '@/services/data-access'
import { appConstants } from '@/utilities/consts'
import { DefaultFoldersIds } from '@/utilities/consts'

const datadataAccessLocalStorageImpl: DataAccess = new DataAccessLocalStorageImpl()
export const useFolderStore = defineStore('folder', () => {
  const folders = ref<Folder[]>([])
  const currentFolderId: DefaultFoldersIds | number | string = ref(0)
  const currentNote = ref<Note | null>(null)

  function getCurrentFolder(): Folder {
    return folders.value[currentFolderId.value]
  }

  function changeCurrentSelectedNote(note: Note | null) {
    currentNote.value = note
  }

  function changeCurrentFolderId(id: number) {
    currentFolderId.value = id
  }

  function addNewFolder(folder: Folder) {
    folders.value.push(folder)
  }

  function addNewNoteToCurrentFolder(note: Note) {
    folders.value[currentFolderId.value].notes.push(note)
  }

  function addNewNoteToFolder(folderId: number | string, note: Note) {
    const index = folders.value.findIndex((folder) => folder.id === folderId)
    folders.value[index].notes.push(note)
  }

  function deleteFolder(folderId: number | string) {
    const index = folders.value.findIndex((folder) => folder.id === folderId)
    folders.value.splice(index, 1)
  }

  function deleteNoteFromCurrentFolder(noteId: number | string): boolean {
    const index = folders.value[currentFolderId.value].notes.findIndex((note) => note.id === noteId)
    try {
      folders.value[currentFolderId.value].notes.splice(index, 1)
      return true
    } catch (error) {
      return false
    }
  }

  function deleteNoteFromFolder(folderId: number | string, noteId: number | string): boolean {
    try {
      const folderIndex = folders.value.findIndex((folder) => folder.id === folderId)
      const noteIndex = folders.value[folderIndex].notes.findIndex((note) => note.id === noteId)
      folders.value[folderIndex].notes.splice(noteIndex, 1)
      return true
    } catch (error) {
      return false
    }
  }

  function addNoteToArchiveFolder(note: Note) {
    folders.value[DefaultFoldersIds.archiveFolderId].notes.push(note)
  }

  function updateLocalStorage() {
    datadataAccessLocalStorageImpl
      .post(appConstants.DEFAULT_LOCAL_STORAGE_KEY, folders.value)
      .then(() => {
        console.log('Updated localstorage')
      })
      .catch((error) => {
        console.log('Error while updating localstorage', error)
      })
  }

  return {
    updateLocalStorage,
    currentNote,
    changeCurrentSelectedNote,
    folders,
    currentFolderId,
    changeCurrentFolderId,
    addNewFolder,
    addNewNoteToCurrentFolder,
    addNewNoteToFolder,
    deleteFolder,
    deleteNoteFromCurrentFolder,
    addNoteToArchiveFolder,
    deleteNoteFromFolder,
    getCurrentFolder
  }
})
