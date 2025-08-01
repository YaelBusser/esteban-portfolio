import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: '/esteban-portfolio/',
    plugins: [
        react(),
        svgr({
            exportAsDefault: true,
            svgrOptions: {
                icon: true,
            },
        }),
    ],
});
