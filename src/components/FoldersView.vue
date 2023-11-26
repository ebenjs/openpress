<script setup lang="ts">
import { ref, type PropType, watch, computed } from 'vue';
import LogoView from './LogoView.vue';
import FolderGroup from './folders-view/FolderGroup.vue';
import type { Folder } from '@/types';
import { generateUniqueId } from '@/utilities/helpers';
import { appConstants } from '@/utilities/consts';

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
        ],
    },
})

const emit = defineEmits(['selected-folder-change']);

const defaultFolders = computed(() => {

    const defaultFoldersFromLocalStorage = localStorage.getItem(appConstants.DEFAULT_LOCAL_STORAGE_KEY);
    if (defaultFoldersFromLocalStorage) {
        return JSON.parse(defaultFoldersFromLocalStorage);
    } else {
        return appConstants.DEFAULT_FOLDERS;
    }
})

const filteredFoldersNoDefault = computed(() => {
    return props.folders.filter((folder) => {
        return !folder.isDefault;
    })
})

</script>

<template>
    <div>
        <LogoView />
        <div class="default-folder-group-wrapper">
            <FolderGroup v-for="folder in defaultFolders" :key="folder.id" :folder="folder"
                @click="$emit('selected-folder-change', folder.id)" />
        </div>
        <FolderGroup v-for="folder in filteredFoldersNoDefault" :key="folder.id" :folder="folder" />
    </div>
</template>


<style lang="scss" scoped>
.default-folder-group-wrapper {
    padding-top: calc($default-box-padding * 1.5);
    padding-bottom: calc($default-box-padding * 1.5);
    border-bottom: solid 1px $default-border-color;
}
</style>