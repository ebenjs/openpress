<script setup lang="ts">
import { onMounted, ref, type PropType, watch } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import Alert from 'editorjs-alert';
import Warning from '@editorjs/warning';
import type { Note } from '@/types';

const props = defineProps({
    note: {
        type: Object as PropType<Note> | null,
        required: true,
    },
})

const emit = defineEmits(['note-edited']);

const noteCopy = ref<Note>(props.note);
const editor = ref<EditorJS>(new EditorJS({
    holder: 'editorjs',
    placeholder: 'Let`s write an awesome story!',
    tools: {
        quote: Quote,
        header: Header,
        alert: Alert,
        warning: Warning,
    },
    data: {
        "time": 1550476186479,
        "blocks": [
            {
                "id": "oUq2g_tl8y",
                "type": "header",
                "data": {
                    "text": "Editor.js",
                    "level": 2
                }
            },
        ],
        "version": "2.8.1"
    },
}));


watch(() => props.note, (note) => {
    noteCopy.value = note;
});

onMounted(() => {
    setInterval(() => {
        editor.value.save().then((outputData) => {
            console.log('Article data: ', outputData);
            noteCopy.value.data = outputData;
            emit('note-edited', outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error);
        });
    }, 5000);
})

</script>

<template>
    <div id="editorjs">
    </div>
</template>


<style lang="scss" scoped>
#editorjs {
    padding-top: 3%;
}
</style>