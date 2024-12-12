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
            <div
                class="tw-py-2 tw-text-gray-500"
                @click="showDrawer = !showDrawer">
                <el-icon :size="32">
                    <Menu />
                </el-icon>
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
