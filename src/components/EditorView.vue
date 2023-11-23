<script setup lang="ts">
import { onMounted, ref, type PropType, watch } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Quote from '@editorjs/quote';
import Header from '@editorjs/header';
import Alert from 'editorjs-alert';
import Warning from '@editorjs/warning';

const props = defineProps({
    note: {
        type: Object as PropType<Note> | null,
        required: true,
    },
})

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
const noteCopy = ref<Note>(props.note);


watch(() => props.note, (note) => {
    noteCopy.value = note;
    editor.value.render(
        {
            "time": 1550476186479,
            "blocks": [
                {
                    "id": "oUq2g_tl8y",
                    "type": "header",
                    "data": {
                        "text": "Editor.js updated",
                        "level": 2
                    }
                },
            ],
            "version": "2.8.1"
        }
    );
});


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