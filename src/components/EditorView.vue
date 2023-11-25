<script setup lang="ts">
import { onMounted, ref, type PropType, watch } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import Alert from 'editorjs-alert';
import Warning from '@editorjs/warning';
import type { Note } from '@/types';

const editorTools = {
    quote: Quote,
    header: Header,
    alert: Alert,
    warning: Warning,
};
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
    tools: editorTools,
}));


watch(() => props.note, (note) => {
    noteCopy.value = note;
    editor.value.render(note.data);
    console.log('note changed', note);

});

onMounted(() => {
    setInterval(() => {
        editor.value.save().then((outputData) => {
            console.log('Article data: ', outputData);
            noteCopy.value.data = outputData;
            // emit('note-edited', outputData);
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