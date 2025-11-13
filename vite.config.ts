import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  const mode = configEnv.mode ?? "development";
  const env = loadEnv(mode, process.cwd(), "");

  const userConfig: UserConfig = {
    plugins: [react()],

    // 开发服务器配置
    server: {
      port: Number(env.VITE_PORT) || 5173,
      host: true,
      open: true,
      // 跨域代理配置
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:3000",
          changeOrigin: true,
          rewrite: (reqPath) => reqPath.replace(/^\/api/, ""),
        },
      },
    },

    // 路径别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    // 构建配置
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      // 代码分割
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "antd-vendor": ["antd", "antd-style"],
            "state-vendor": ["jotai", "ahooks"],
          },
        },
      },
      // chunk 大小警告限制
      chunkSizeWarningLimit: 1000,
    },

    // 通过 esbuild 在打包时移除调试语句
    esbuild: {
      drop: ["console", "debugger"],
    },
  };

  return userConfig;
});
