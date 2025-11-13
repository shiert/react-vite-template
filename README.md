# React Vite Template

一个开箱即用的 React + Vite 开发模板，集成了常用的开发工具和最佳实践。

## 技术栈

- ⚛️ **React 19** - 最新的 React 版本
- ⚡ **Vite** - 极速的开发体验
- 🎨 **Ant Design** - 企业级 UI 组件库
- 🎭 **antd-style** - 主题切换支持
- 🗂️ **React Router v6** - 路由管理
- 📡 **Axios** - HTTP 请求库
- 🪝 **ahooks** - React Hooks 工具库
- 💾 **Jotai** - 原子化状态管理
- 📘 **TypeScript** - 类型安全
- 🎨 **Less** - CSS 预处理器

## 项目结构

```
src/
├── pages/          # 页面组件
│   ├── Home/       # 首页
│   ├── About/      # 关于页
│   └── NotFound/   # 404页面
├── components/     # 公共组件
│   └── ThemeProvider/  # 主题配置组件
├── layouts/        # 布局组件
│   └── BasicLayout/    # 基础布局
├── router/         # 路由配置
│   └── index.tsx   # 路由配置文件
├── store/          # Jotai 状态管理
│   ├── theme.ts    # 主题状态
│   └── user.ts     # 用户状态
├── services/       # API 服务
│   └── request.ts  # Axios 实例配置
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
├── styles/         # 全局样式
│   └── global.less # 全局样式文件
└── types/          # TypeScript 类型定义
```

## 快速开始

### 安装依赖

```bash
yarn install
# 或
npm install
```

### 开发

```bash
yarn dev
# 或
npm run dev
```

### 构建

```bash
yarn build
# 或
npm run build
```

### 预览

```bash
yarn preview
# 或
npm run preview
```

## 功能特性

### 路径别名

项目配置了 `@` 作为 `src` 目录的别名，可以方便地引入模块：

```typescript
import ThemeProvider from '@/components/ThemeProvider'
import { themeAtom } from '@/store/theme'
```

### 主题切换

使用 Jotai 管理主题状态，支持浅色/深色主题切换：

```typescript
import { useAtom } from 'jotai'
import { themeAtom } from '@/store/theme'

const [theme, setTheme] = useAtom(themeAtom)
setTheme(theme === 'light' ? 'dark' : 'light')
```

### HTTP 请求

已配置好的 Axios 实例，包含请求/响应拦截器：

```typescript
import { request } from '@/services/request'

// 使用示例
const fetchData = async () => {
  const data = await request({
    url: '/api/users',
    method: 'GET',
  })
  return data
}
```

### 状态管理

使用 Jotai 进行状态管理：

```typescript
// 定义 atom
import { atom } from 'jotai'

export const countAtom = atom(0)

// 使用 atom
import { useAtom } from 'jotai'
import { countAtom } from '@/store/count'

const [count, setCount] = useAtom(countAtom)
```

### 路由配置

在 [src/router/index.tsx](src/router/index.tsx) 中配置路由：

```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
])
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置环境变量：

```bash
cp .env.example .env
```

## 开发建议

1. **组件开发**：在 `src/components` 目录下创建可复用组件
2. **页面开发**：在 `src/pages` 目录下创建页面组件
3. **API 服务**：在 `src/services` 目录下创建 API 服务模块
4. **状态管理**：在 `src/store` 目录下创建 Jotai atoms
5. **工具函数**：在 `src/utils` 目录下创建工具函数
6. **自定义 Hooks**：在 `src/hooks` 目录下创建自定义 Hooks

## License

MIT
