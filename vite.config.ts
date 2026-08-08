import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            // 사용자가 직접 엡데이트를 확인하는 방식
            registerType: "prompt",
            workbox: {
                skipWaiting: true,
                clientsClaim: true
            },
            manifest: {
                lang: "ko",
                name: "TimeChecked",
                short_name: "TimeChecked",
                description: "시설물 점검 관리 시스템",
                theme_color: "#1976d2",
                background_color: "#ffffff",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
                icons: [
                    {
                        src: "/icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ]
});