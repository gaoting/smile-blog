"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_vue_1 = require("@vitejs/plugin-vue");
const path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)()],
    define: {
        'process.env': {}
    },
    publicDir: "public",
    base: './',
    assetsInclude: "",
    logLevel: "info",
    resolve: {
        alias: {
            '/@': (0, path_1.resolve)(__dirname, ".", 'src'),
        },
    },
    optimizeDeps: {},
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'terser',
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js1/[name]-[hash]-test.js',
                entryFileNames: 'static/js2/[name]-[hash]-test.js',
                assetFileNames: 'static/[ext]/[name]-[hash]-test.[ext]'
            },
        },
        commonjsOptions: {},
        manifest: false,
    },
    css: {
        modules: {},
        postcss: {},
        preprocessorOptions: {
            scss: {
                additionalData: `$injectedColor:orange;`
            }
        }
    },
    json: {
        namedExports: true,
        stringify: false
    },
    esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
        jsxInject: `import Vue from 'vue'`
    },
    server: {
        host: "localhost",
        https: false,
        cors: true,
        open: true,
        port: 9000,
        strictPort: false,
        force: true,
        hmr: true,
        watch: {
            ignored: ["!**/node_modules/your-package-name/**"]
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3006',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
});
//# sourceMappingURL=vite.config.js.map