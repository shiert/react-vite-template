import { Button, Card, Space, Typography } from 'antd'
import { useAtom } from 'jotai'
import { themeAtom } from '@/store/theme'

const { Title, Paragraph } = Typography

export default function Home() {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={2}>欢迎使用 React + Vite 开发模板</Title>
        <Paragraph>
          这是一个基于 React 19 + Vite + TypeScript + Ant Design 的现代化开发模板
        </Paragraph>
      </Card>

      <Card title="技术栈">
        <ul>
          <li>⚛️ React 19 - 最新的 React 版本</li>
          <li>⚡ Vite - 极速的开发体验</li>
          <li>🎨 Ant Design - 企业级 UI 组件库</li>
          <li>🎭 antd-style - 主题切换支持</li>
          <li>🗂️ React Router - 路由管理</li>
          <li>📡 Axios + ahooks - 数据请求</li>
          <li>💾 Jotai - 原子化状态管理</li>
          <li>📘 TypeScript - 类型安全</li>
        </ul>
      </Card>

      <Card title="主题切换">
        <Space>
          <span>当前主题: {theme === 'light' ? '浅色' : '深色'}</span>
          <Button type="primary" onClick={toggleTheme}>
            切换主题
          </Button>
        </Space>
      </Card>
    </Space>
  )
}