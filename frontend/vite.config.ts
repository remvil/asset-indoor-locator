import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import {defineConfig} from "vitest/config";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		legacy(),
		VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Nome della tua App',
        short_name: 'NomeCorto',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        description: 'Descrizione della tua App PWA.',
        icons: [
          {
            src: 'images/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@vueuse/core": path.resolve(__dirname, "node_modules/@vueuse/core"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@images": path.resolve(__dirname, "./src/public/images"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
	},
});
