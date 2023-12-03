<script setup lang="ts"></script>

<template>
  <div class="no-notes-wrapper d-flex flex-column justify-content-center align-items-center h-100">
    <p>
      <span class="material-symbols-outlined text-center" style="font-size: 60px"> function </span>
    </p>
    <p class="helper-text">Please select a note to edit.</p>

    <div class="shortcut-panel">
      <ul class="m-0 p-0">
        <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> : Undo</li>
        <li><kbd>Ctrl</kbd> + <kbd>Y</kbd> : Redo</li>
        <li><kbd>Esc</kbd> : Close editor</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-notes-wrapper {
  .helper-text {
    @include medium;
  }

  .shortcut-panel {
    @include medium;

    ul {
      list-style: none;
    }
  }
}
</style>
