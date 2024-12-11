import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

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
        },
        build: {
            outDir: `dist/${mode}`,
        },
        plugins: [vue()],
        clearScreen: false,
    };
});
