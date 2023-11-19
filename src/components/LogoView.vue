<script setup lang="ts">

</script>
        
<template>
    <div class="logo-wrapper py-2 d-flex align-items-center">
        <img src="../assets/images/edit-write-2.svg" alt="logo" class="logo" />
        <span class="logo-text">Open Press</span>
    </div>
</template>


<style lang="scss" scoped>
.logo-wrapper {
    padding: 10px;
    border-bottom: solid 1px $default-border-color;

    .logo {
        width: 30px;
    }

    .logo-text {
        margin: 0;
        padding-left: 10px;
        color: $white;
        @include medium;
    }
}
</style>