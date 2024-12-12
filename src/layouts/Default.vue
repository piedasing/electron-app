<script setup></script>

<template>
    <div class="common-layout">
        <el-container class="tw-h-full">
            <el-aside width="240px">
                <el-menu class="el-menu-vertical-demo">
                    <el-menu-item index="1-2" route="/">
                        來賓車位計算機
                    </el-menu-item>
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
