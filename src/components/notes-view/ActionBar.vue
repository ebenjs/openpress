<script setup lang="ts">

import { ref, watch, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import CustomPopover from './CustomPopover.vue';

const emit = defineEmits(['search-text-changed', 'filter-options-changed', 'add-note']);
const searchText = ref('');
const isPopoverActive = ref(false);
const filterOptions = ref({
    read: true,
    unread: true,
});

const togglePopoverState = () => {
    isPopoverActive.value = !isPopoverActive.value;
};

const handleAddNote = () => {
    emit('add-note');
};

watch(searchText, (value) => {
    emit('search-text-changed', value);
});

watch(filterOptions.value, (value) => {
    emit('filter-options-changed', value);
});

onMounted(() => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            isPopoverActive.value = false;
        }
    })

    window.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.actions-wrapper')) {
            isPopoverActive.value = false;
        }

    });
});
</script>

<template>
    <div class="d-flex align-items-center action-bar">
        <div class="actions-wrapper d-flex">
            <button class="filter-button p-0" @click="togglePopoverState">
                <span class="material-symbols-outlined">
                    tune
                </span>
            </button>
            <button class="add-button p-0" @click="handleAddNote">
                <span class="material-symbols-outlined">
                    post_add
                </span>
            </button>
            <CustomPopover v-if="isPopoverActive">
                <p class="filter-title">
                    Filter notes in this directory by
                </p>
                <div class="form-check">
                    <input v-model="filterOptions.read" class="form-check-input" type="checkbox" value="read"
                        id="readCheckbox">
                    <label class="form-check-label" for="readCheckbox">
                        Read
                    </label>
                </div>
                <div class="form-check">
                    <input v-model="filterOptions.unread" class="form-check-input" type="checkbox" value="unread"
                        id="unreadCheckbox">
                    <label class="form-check-label" for="unreadCheckbox">
                        Unread
                    </label>
                </div>
            </CustomPopover>
        </div>
        <div class="ms-auto w-100 d-flex justify-content-end">
            <SearchBar v-model="searchText" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.action-bar {
    padding: 10px;
    border-bottom: solid 1px $default-border-color;

    .actions-wrapper {
        // width: 48px;
        height: 24px;

        .filter-button,
        .add-button {
            background-color: transparent;
            border: none;
            color: $dull-white;
            width: 24px;
            height: 24px;
        }

        .add-button {
            margin-left: 5px;
        }

        .filter-title {
            color: $dull-white;
            @include x-small;
        }

        .form-check-label {
            color: $dull-white;
            @include x-small;
        }
    }
}
</style>