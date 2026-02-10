import { defineConfig } from 'vite';
importWQ
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_PATH || "/react-vite-deploy",
});
