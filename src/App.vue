<script setup>
import * as Layouts from './layouts/index.js';
</script>

<template>
    <Layouts.Default>
        <router-view></router-view>
    </Layouts.Default>
</template>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    width: 100%;
    height: 100%;
}
</style>
