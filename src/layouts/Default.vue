<script setup></script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
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
        </el-container>
    </div>
</template>

<style lang="scss" scoped></style>
