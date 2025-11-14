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
          target: env.VITE_API_TARGET,
          changeOrigin: true,
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

    // 生产环境移除 console 和 debugger
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },

    // 构建配置
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      // 代码分割
      rollupOptions: {
        output: {
          // 自定义文件命名
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            // CSS 文件
            if (assetInfo.names?.[0]?.endsWith('.css')) {
              return 'css/[name]-[hash][extname]'
            }
            // 其他资源文件(图片、字体等)
            return 'assets/[name]-[hash][extname]'
          },
          // 智能代码分割
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 统一路径分隔符(Windows \ 转为 /)
              const normalizedId = id.replace(/\\/g, '/')

              // 图表库
              if (normalizedId.includes('/@ant-design/plots') || normalizedId.includes('/@antv')) {
                return "charts-vendor"
              }
              // React 全家桶
              if (normalizedId.includes('/react/') || normalizedId.includes('/react-dom/') || normalizedId.includes('/react-router')) {
                return "react-vendor"
              }
              // Ant Design 相关
              if (normalizedId.includes('/antd/') || normalizedId.includes('/antd-style/')) {
                return "antd-vendor"
              }
              // 状态管理和工具库
              if (normalizedId.includes('/jotai/') || normalizedId.includes('/ahooks/') || normalizedId.includes('/axios/')) {
                return "utils-vendor"
              }
              // 其他第三方库统一打包
              return "vendor"
            }
          },
        },
      },
      // chunk 大小警告限制
      chunkSizeWarningLimit: 1000,
    },
   
  };

  return userConfig;
});
