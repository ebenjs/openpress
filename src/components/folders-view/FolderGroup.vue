<script setup lang="ts">
import type { Folder } from '@/types';
import { type PropType } from 'vue';
import { useFolderStore } from '@/stores/folder';

const folderStore = useFolderStore();
const props = defineProps({
    folder: {
        type: Object as PropType<Folder>,
        required: true,
    },
})

</script>

<template>
    <div :class="`folder-group ${folder.id === folderStore.currentFolderId ? 'active' : ''}`">
        <div class="folder-group-header d-flex align-items-center">
            <span class="folder-icon material-symbols-outlined" :style="folder.background ? `${folder.background};-webkit-text-fill-color: transparent;
    -webkit-background-clip: text;` : ''">
                {{ folder.icon ?? 'folder' }}
            </span>
            <span class="folder-group-name w-100 d-flex align-items-center">
                <span>
                    {{ folder.name }}
                </span>
                <span v-if="folder.notes.length > 0" class="badge rounded-pill background-accen-darken ms-auto">
                    {{ folder.notes.length }}
                </span>
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
    }

    .folder-group-header {
        @include small;

        .folder-icon {}

        .folder-group-name {
            padding-top: 4px;
        }
    }

    .folder-group-name {
        padding-left: 10px;
        color: $white;
        @include small;
    }
}

.active {
    background-color: $hover-color-primary;
    border-left-color: $accent-color;

    .folder-group-name {
        color: $accent-color;
    }
}
</style>