import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Clean only old built assets before building (preserves PHP files)
function emptyPublicDirPlugin() {
    return {
        name: "empty-public-dir",
        async buildStart() {
            const assetsDir = path.join(__dirname, "public_html", "assets");
            if (fs.existsSync(assetsDir)) {
                fs.rmSync(assetsDir, { recursive: true, force: true });
            }

            const indexHtml = path.join(__dirname, "public_html", "index.html");
            if (fs.existsSync(indexHtml)) {
                fs.rmSync(indexHtml, { force: true });
            }
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), emptyPublicDirPlugin()],
    root: path.resolve(__dirname, "resources/assets"),
    envDir: path.resolve(__dirname), // Look for .env files in project root (where vite.config.ts is)
    build: {
        copyPublicDir: false,
        emptyOutDir: false,
        outDir: "../../public_html",
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
            },
        },
    },
    // Docker/Traefik development server configuration
    server: {
        host: "0.0.0.0", // Allow external connections for Docker
        port: 5173,
        allowedHosts: ["web.local.dev"],
        watch: {
            usePolling: true, // Enable polling for file changes in Docker (required for volume mounts)
            interval: 1000, // Polling interval in milliseconds
        },
        hmr: {
            host: "web.local.dev", // HMR host for Traefik setup
            clientPort: 443, // Use HTTPS port for HMR in Traefik
        },
    },
});
