import { Card, Descriptions } from 'antd'

export default function About() {
  return (
    <Card title="关于项目">
      <Descriptions column={1}>
        <Descriptions.Item label="项目名称">React Vite Template</Descriptions.Item>
        <Descriptions.Item label="版本">1.0.0</Descriptions.Item>
        <Descriptions.Item label="描述">
          一个开箱即用的 React + Vite 开发模板，集成了常用的开发工具和最佳实践
        </Descriptions.Item>
        <Descriptions.Item label="特性">
          路由管理、状态管理、HTTP请求、主题切换、TypeScript支持
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
