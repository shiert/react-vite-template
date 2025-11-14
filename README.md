# React Vite Template

一个开箱即用的 React + Vite 开发模板，集成了常用的开发工具和最佳实践。

## ✨ 技术栈

### 核心框架
- ⚛️ **React 18.3.1** - 稳定的 React 版本
- ⚡ **Vite 7.2.2** - 极速的开发体验
- 📘 **TypeScript 5.9.3** - 类型安全

### UI & 样式
- 🎨 **Ant Design 5.28.1** - 企业级 UI 组件库
- 🎭 **antd-style 3.7.1** - CSS-in-JS 解决方案
- 📊 **@ant-design/plots 2.6.6** - 数据可视化图表库
- 🎨 **Less 4.4.2** - CSS 预处理器

### 状态管理 & 路由
- 💾 **Jotai 2.15.1** - 原子化状态管理
- 🗂️ **React Router v7.9.5** - 路由管理

### 工具库
- 🪝 **ahooks 3.9.6** - React Hooks 工具库
- 📡 **Axios 1.13.2** - HTTP 客户端

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Loading/         # 加载组件
│   ├── ThemeProvider/   # 主题提供者
│   └── NotFound/        # 404 页面
├── layouts/             # 布局组件
│   └── BasicLayout/     # 基础布局
├── pages/               # 页面组件
│   ├── Home/            # 首页
│   └── About/           # 关于页
├── router/              # 路由配置
│   └── index.tsx        # 路由定义
├── services/            # API 服务
│   ├── api.ts           # API 接口定义
│   └── request.ts       # Axios 封装
├── store/               # Jotai 状态管理
│   ├── theme.ts         # 主题状态
│   └── user.ts          # 用户状态
├── types/               # TypeScript 类型定义
│   └── api.ts           # API 类型
├── styles/              # 全局样式
│   └── global.less      # 全局样式文件
└── main.tsx             # 应用入口
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 🎯 功能特性

### 路径别名

项目配置了 `@` 作为 `src` 目录的别名，可以方便地引入模块：

```typescript
import ThemeProvider from '@/components/ThemeProvider'
import { themeAtom } from '@/store/theme'
```

### 主题色切换

支持 10 种 Ant Design 预设主题色，点击切换即可应用到所有组件：

```typescript
import { useAtom } from 'jotai'
import { themeAtom, PRESET_COLORS } from '@/store/theme'

const [themeColor, setThemeColor] = useAtom(themeAtom)
// 切换主题色
setThemeColor(PRESET_COLORS.sunset) // 日暮橙色
```

**预设颜色**：
- 🔵 拂晓蓝（默认）`#1677ff`
- 🔴 薄暮 `#f5222d`
- 🟠 火山 `#fa541c`
- 🟠 日暮 `#fa8c16`
- 🟡 金盏花 `#faad14`
- 🟢 极光绿 `#52c41a`
- 🔵 明青 `#13c2c2`
- 🔵 极客蓝 `#2f54eb`
- 🟣 酱紫 `#722ed1`
- 🌸 洋红 `#eb2f96`

### API 请求

统一的 API 请求封装，包含请求/响应拦截器：

```typescript
import { request } from '@/services/request'
import type { ApiResponse, UserInfo } from '@/types/api'

// 定义接口（需包含 /api 前缀）
export const getUserInfo = () =>
  request<ApiResponse<UserInfo>>({
    url: '/api/user/info',
    method: 'GET',
  })
```

**API 响应规范**：
```typescript
interface ApiResponse<T> {
  status: number    // 0 表示成功
  message: string   // 响应消息
  data: T           // 响应数据
}
```

**错误处理**：
- `status !== 0`：自动提示错误信息
- HTTP/网络错误：统一错误提示
- 特殊处理：业务层自行捕获

### 状态管理

使用 Jotai 进行原子化状态管理：

```typescript
// 定义 atom
import { atom } from 'jotai'

export const userAtom = atom<UserInfo | null>(null)

// 使用 atom
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user'

const [user, setUser] = useAtom(userAtom)
```

### 路由配置

使用 React Router v7 + 懒加载优化性能：

```typescript
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'home',
        element: <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>,
      },
    ],
  },
])
```

### 图表开发

集成 @ant-design/plots，开箱即用的数据可视化：

```typescript
import { Line, Column, Pie } from '@ant-design/plots'

const LineChart = () => {
  const config = {
    data: [...],
    xField: 'date',
    yField: 'value',
  }
  return <Line {...config} />
}
```

## ⚙️ 环境变量

创建 `.env.development` 和 `.env.production` 配置环境变量：

```env
# 开发服务器端口
VITE_PORT=5173

# API 代理目标（仅开发环境）
VITE_API_TARGET=http://localhost:3000
```

**说明**：
- **开发环境**：所有 `/api/*` 请求会通过 Vite proxy 代理到 `VITE_API_TARGET`
- **生产环境**：直接请求同域接口，无需配置

## 📝 开发规范

### 代码风格
- TypeScript 严格模式
- 函数组件 + Hooks
- 页面组件懒加载 + Suspense
- 优先使用 `type` 而非 `interface`

### 命名规范
- 组件文件：`PascalCase` (UserProfile.tsx)
- 函数/变量：`camelCase` (getUserInfo)
- 常量：`UPPER_SNAKE_CASE` (API_BASE_URL)
- 类型：`PascalCase` (UserInfo, ApiResponse)

### 导入顺序
1. React 相关
2. 第三方库
3. 类型导入
4. 本地模块（使用 `@/` 别名）

### 组件开发
- 公共组件放在 `src/components/`
- 页面组件放在 `src/pages/`
- 每个组件独立文件夹，包含 `index.tsx`
- 组件样式优先使用 antd-style (CSS-in-JS)

## 📚 更多信息

详细的开发规范和 API 规范请参考 [claude.md](./claude.md)

## 📄 License

MIT
