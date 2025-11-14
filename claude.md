# React Vite 项目规范

React 18 + Vite 7 + TypeScript + Ant Design 5 + Jotai + React Router v7

**路径别名**: `@/` → `src/`
**包管理器**: npm（不使用 yarn）

---

## ⚠️ 核心规范

**操作前确认**: 任何修改前需列出计划，经用户同意后执行

---

## 命名规范

- 组件: `PascalCase` (UserProfile.tsx)
- 函数/变量: `camelCase` (getUserInfo)
- 常量: `UPPER_SNAKE_CASE` (API_BASE_URL)
- 类型: `PascalCase` (UserInfo, ApiResponse)

---

## 代码风格

- TypeScript 严格模式，优先使用 `type`
- 函数组件 + Hooks，页面组件懒加载 + Suspense
- 组件内代码顺序: Hooks → 状态 → 副作用 → 事件处理 → JSX

---

## 导入顺序

1. React 相关
2. 第三方库
3. 类型导入
4. 本地模块（使用 `@/` 别名）

---

## API 规范

### 响应格式
```typescript
interface ApiResponse<T> {
  status: number    // 200 = 成功
  message: string
  data: T
}
```

### 关键要求
- ✅ 接口 URL 必须包含 `/cosy` 前缀（如 `/cosy/user`）
- ✅ `status === 200` 表示成功，非 200 自动提示错误
- ✅ 使用 `request` 方法而非直接使用 axios

---

## 组件开发

- 公共组件: `src/components/`（每个组件独立文件夹含 index.tsx）
- 页面组件: `src/pages/`
- 布局组件: `src/layouts/`
- 组件样式: 优先使用 antd-style (CSS-in-JS)

---

## 路由配置

- 使用 `createBrowserRouter` + `lazy` 懒加载
- 使用 `withSuspense` HOC 包裹懒加载组件
- 嵌套路由使用 `children`

---

## 状态管理

- 使用 Jotai 进行原子化状态管理
- 状态文件放在 `src/store/`

---

## 环境变量

**开发环境**: `/api/*` 代理到 `VITE_API_TARGET`
**生产环境**: 直接请求同域接口
