<script setup>
import { ref } from 'vue';

const showDrawer = ref(false);

const menus = [
    {
        label: '首頁',
        route: '/',
    },
    {
        label: '來賓車位計算機',
        route: '/calculator',
    },
];
</script>

<template>
    <div class="common-layout">
        <el-header class="md:tw-hidden">
            <div class="tw-relative">
                <div
                    class="tw-absolute tw-left-0 tw-top-1/2 tw-py-2 tw-text-gray-500 [transform:translateY(-50%)]"
                    @click="showDrawer = !showDrawer">
                    <svg
                        class="tw-h-8 tw-w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </div>
                <div class="tw-flex tw-justify-center">
                    <img class="tw-h-16" src="@/assets/logo.jpg" />
                </div>
            </div>
            <el-drawer v-model="showDrawer" :with-header="false" :size="'80%'">
                <template #default>
                    <el-menu class="" :router="true">
                        <template v-for="(menu, index) in menus" :key="index">
                            <el-menu-item
                                :index="menu.route"
                                :route="menu.route">
                                {{ menu.label }}
                            </el-menu-item>
                        </template>
                    </el-menu>
                </template>
            </el-drawer>
        </el-header>
        <el-container class="tw-h-full">
            <el-aside
                width="240px"
                class="tw-hidden tw-border-r-2 tw-border-r-gray-200 md:tw-block">
                <img src="@/assets/logo.jpg" />
                <el-menu class="tw-border-none" :router="true">
                    <template v-for="(menu, index) in menus" :key="index">
                        <el-menu-item :index="menu.route" :route="menu.route">
                            {{ menu.label }}
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.common-layout {
    width: 100%;
    height: 100%;
}
</style>
