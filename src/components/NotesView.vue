<script setup lang="ts">
import { type PropType, onMounted } from 'vue';
import useTextFormatter from '../utilities/text-formatter.vue';
import useDateHelper from '../utilities/date-helper.vue';
import type { Note } from '@/types';
import { useFolderStore } from '@/stores/folder';

const folderStore = useFolderStore();

const props = defineProps({
    notes: {
        type: Array as PropType<Note[]>,
        required: true,
    },
})

const { capitalizeFirstChar } = useTextFormatter();
const { getCurrentDate } = useDateHelper();

const computeNoteTitle = (note: Note) => {
    // if note first block data is not empty, return it else return 'Untitled'
    if (note.data.blocks.length > 0) {
        if (note.data.blocks[0].data.text !== '') {
            return note.data.blocks[0].data.text;
        }
    }
    return 'Untitled';
}

const computeNoteDescription = (note: Note) => {
    // if note block exist and is text based(p or h), return it else return 'No description'
    if (note.data.blocks.length > 1) {
        if (note.data.blocks[1].type === 'paragraph' || note.data.blocks[1].type === 'header') {
            return note.data.blocks[1].data.text;
        }
    }
    return 'No description';
}

const handleNoteClick = (note: Note) => {
    folderStore.currentNote = note;
    folderStore.changeCurrentSelectedNote(note);
}

onMounted(() => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            console.log('esc pressed');

            folderStore.changeCurrentSelectedNote(null);
        }
    });
})

</script>

<template>
    <div v-for="note in notes" :key="note.id">
        <div :class="`item-content ${note === folderStore.currentNote ? 'active' : ''}`" @click="handleNoteClick(note)">
            <p class="item-title">{{ capitalizeFirstChar(computeNoteTitle(note)) }}</p>
            <p class="item-description">{{ computeNoteDescription(note) }}</p>
            <small class="item-meta">
                <span class="item-meta-item d-flex align-items-center pt-2">
                    <span class="author-picture">
                        <img src="https://picsum.photos/200" alt="avatar" />
                    </span>
                    <span class="ms-1">By : ebenjs on {{ getCurrentDate("DD/MM/YYYY") }}</span>
                </span>
            </small>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$padding: 15px;

.item-content {
    padding: $padding;
    padding-left: calc($padding - 4px);
    border-left: solid 4px transparent;
    cursor: pointer;

    &:hover {
        background-color: $hover-color-primary;
    }

    p {
        margin: 0;
    }

    .item-title {
        color: $white;
        @include small;
    }

    .item-description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 4px;
        @include x-small;
    }

    .item-meta {
        @include xx-small;
    }

    .author-picture {
        img {

            width: 20px;
            height: 20px;
            border: solid 1px $white;
            border-radius: 50%;
        }
    }
}

.active {
    background-color: $hover-color-primary;
    border-left-color: $accent-color;

    .item-title {
        color: $accent-color;
    }
}
</style>