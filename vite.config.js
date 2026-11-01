import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        svelte(),
    ],
    resolve: {
        // Laracaptcha incluye sus componentes como código fuente: los compila la aplicación.
        alias: {
            '@laracaptcha': new URL('./vendor/edulazaro/laracaptcha/resources/js', import.meta.url).pathname,
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
