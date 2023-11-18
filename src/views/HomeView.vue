<script setup lang="ts">
import FoldersView from '@/components/FoldersView.vue';
import NotesView from '@/components/NotesView.vue';
import ActionBar from '@/components/notes-view/ActionBar.vue';
import FolderBar from '@/components/notes-view/FolderBar.vue';
import { onMounted, ref } from 'vue'

const notes = ref([])
const notesCopy = ref([])

const handleSearchTextChanged = (value: string) => {
  notesCopy.value = notes.value.filter((note: Note) => {
    return note.title.toLowerCase().includes(value.toLowerCase())
  })
}

onMounted(() => {
  fetch('http://localhost:3000/folders')
    .then((response) => response.json())
    .then((json) => {
      notes.value = json[0].posts
      notesCopy.value = json[0].posts
    })
})
</script>

<template>
  <div class="d-flex h-100">
    <div class="h-100 first-pane">Hi</div>
    <div class="h-100 flex-grow-1">
      <div class="row h-100 g-0">
        <div class="col-lg-2 h-100 second-pane">
          <FoldersView />
        </div>
        <div class="col-lg-3 h-100 third-pane scroll-overflow">
          <FolderBar label="Default folder" :total="notes.length" />
          <ActionBar @searchTextChanged="handleSearchTextChanged" />
          <NotesView :notes="notesCopy" />
        </div>
        <div class="col-lg-7 h-100 fourth-pane">Hi</div>
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
}
</style>
