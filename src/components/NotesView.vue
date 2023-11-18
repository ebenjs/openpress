<script setup lang="ts">
import { ref, type PropType } from 'vue';
import useTextFormatter from '../utilities/text-formatter.vue';
import useDateHelper from '../utilities/date-helper.vue';


const props = defineProps({
    notes: {
        type: Array as PropType<Note[]>,
        required: true,
    },
})

const { capitalizeFirstChar } = useTextFormatter();
const { getCurrentDate } = useDateHelper();

const activeNote = ref<Note | null>(null);

const handleNoteClick = (note: Note) => {
    activeNote.value = note;
}

</script>

<template>
    <div v-for="note in notes" :key="note.id">
        <div :class="`item-content ${note === activeNote ? 'active' : ''}`" @click="handleNoteClick(note)">
            <p class="item-title">{{ capitalizeFirstChar(note.title) }}</p>
            <p class="item-description">{{ note.body }}</p>
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