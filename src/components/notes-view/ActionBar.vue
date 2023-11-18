<script setup lang="ts">

import { ref, watch, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import CustomPopover from './CustomPopover.vue';

const emit = defineEmits(['searchTextChanged']);
const searchText = ref('');
const isPopoverActive = ref(false);

const togglePopoverState = () => {
    isPopoverActive.value = !isPopoverActive.value;
};

watch(searchText, (value) => {
    emit('searchTextChanged', value);
});
onMounted(() => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            isPopoverActive.value = false;
        }
    })

    window.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.filter-wrapper')) {
            isPopoverActive.value = false;
        }

    });
});
</script>

<template>
    <div class="d-flex align-items-center action-bar">
        <div class="filter-wrapper">
            <button class="filter-button" @click="togglePopoverState">
                <span class="material-symbols-outlined">
                    tune
                </span>
            </button>
            <CustomPopover v-if="isPopoverActive">
                <p class="filter-title">
                    Filter notes in this directory by
                </p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="read" id="readCheckbox">
                    <label class="form-check-label" for="readCheckbox">
                        Read
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="unread" id="unreadCheckbox">
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

    .filter-wrapper {
        width: 24px;
        height: 24px;

        .filter-button {
            background-color: transparent;
            border: none;
            padding: 0;
            color: $dull-white;
            width: 24px;
            height: 24px;
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