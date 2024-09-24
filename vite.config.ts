import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            name: "2js",
            fileName: "2js",
            entry: "src/2js.ts",
            formats: ["es", "cjs", "umd"],
        },
        minify: "terser",
        terserOptions: {
            mangle: {
                reserved: ["Component"],
            },
            compress: true,
            toplevel: true,
        },
    },
});
