<script setup lang="ts">
import { ref, type PropType, watch, computed } from 'vue';
import LogoView from './LogoView.vue';
import FolderGroup from './folders-view/FolderGroup.vue';

const props = defineProps({
    // folders of Notes
    folders: {
        type: Array as PropType<Folder[]>,
        default: () => [
            {
                "id": 0,
                "name": "Default Folder",
            }
        ],
    },
})

const emit = defineEmits(['selected-folder-change']);

const defaultFolders = ref<Folder[]>([
    {
        "id": 0,
        "name": "All notes",
        icon: 'description',
        background: 'background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);',
        notes: []
    },
    {
        "id": 1,
        "name": "Starred",
        icon: 'hotel_class',
        background: 'background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);',
        notes: []
    },
    {
        "id": 2,
        "name": "Archived",
        icon: 'archive',
        background: 'background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);',
        notes: []
    },
    {
        "id": 3,
        "name": "Trash",
        icon: 'recycling',
        background: 'background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);',
        notes: []
    },
    {
        "id": 4,
        "name": "Shared",
        icon: 'folder_shared',
        background: 'background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);',
        notes: []

    }
])

watch(() => props.folders, (newVal: Folder[]) => {
    defaultFolders.value[0].notes = newVal[0].notes;
})
</script>

<template>
    <div>
        <LogoView />
        <div class="default-folder-group-wrapper">
            <FolderGroup v-for="folder in defaultFolders" :key="folder.id" :folder="folder"
                @click="$emit('selected-folder-change', folder.id)" />
        </div>
        <FolderGroup v-for="folder in folders" :key="folder.id" :folder="folder">
        </FolderGroup>
    </div>
</template>


<style lang="scss" scoped>
.default-folder-group-wrapper {
    padding-top: calc($default-box-padding * 1.5);
    padding-bottom: calc($default-box-padding * 1.5);
    border-bottom: solid 1px $default-border-color;
}
</style>