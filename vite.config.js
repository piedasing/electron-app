import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config
export default defineConfig(({ root, mode }) => {
    return {
        root,
        mode,
        base: './',
        server: {
            host: '127.0.0.1',
        },
        resolve: {
            preserveSymlinks: true,
            alias: [
                { find: /\@\//, replacement: path.join(__dirname, './src/') },
            ],
        },
        css: {
            postcss: {
                plugins: [postcssImport, autoprefixer, tailwindcss],
            },
            preprocessorOptions: {
                scss: { api: 'modern-compiler' },
            },
        },
        build: {
            outDir: `dist/${mode}`,
        },
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            vue(),
        ],
        clearScreen: false,
    };
});
