<script setup lang="ts">
import { onMounted, ref, type PropType, watch, onUnmounted } from 'vue'
import EditorJS from '@editorjs/editorjs'
import Quote from '@editorjs/quote'
import Header from '@editorjs/header'
import Alert from 'editorjs-alert'
import Warning from '@editorjs/warning'
import type { Note } from '@/types'
import { useFolderStore } from '@/stores/folder'
import { appConstants } from '@/utilities/consts'

const folderStore = useFolderStore()

const editorHolder = 'editorjs'
const editorTools = {
  quote: Quote,
  header: Header,
  alert: Alert,
  warning: Warning
}
const editorOptions = {
  holder: editorHolder,
  placeholder: appConstants.EDITOR_PLACEHOLDER,
  tools: editorTools
}
const props = defineProps({
  note: {
    type: Object as PropType<Note> | null,
    required: true
  }
})

const emit = defineEmits(['note-edited'])

const noteCopy = ref<Note>(props.note)
const editor = ref<EditorJS | null>(null)

let interval: any = null

watch(
  () => folderStore.currentNote,
  (note) => {
    if (editor.value) {
      editor.value.destroy()
    }
    if (!note) return
    noteCopy.value = note
    editor.value = new EditorJS({
      ...editorOptions,
      data: note.data
    })
  }
)

onMounted(() => {
  if (editor.value) {
    editor.value.destroy()
  }
  editor.value = new EditorJS({
    ...editorOptions,
    data: props.note.data,
    onChange: () => {
      editor.value
        ?.save()
        .then((outputData) => {
          noteCopy.value.data = outputData
          emit('note-edited', outputData)
        })
        .catch((error) => {
          console.log('Saving failed: ', error)
        })
    }
  })

  if (editor.value === null) return
  interval = setInterval(() => {}, 5000)
})

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy()
  }
  clearInterval(interval)
})
</script>

<template>
  <div id="editorjs"></div>
</template>

<style lang="scss" scoped>
#editorjs {
  padding-top: 3%;
}
</style>
