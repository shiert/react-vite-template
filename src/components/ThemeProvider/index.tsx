import { ConfigProvider, theme } from 'antd'
import { ThemeProvider as AntdStyleProvider } from 'antd-style'
import { useAtomValue } from 'jotai'
import { themeAtom } from '@/store/theme'
import zhCN from 'antd/locale/zh_CN'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeMode = useAtomValue(themeAtom)

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdStyleProvider themeMode={themeMode}>{children}</AntdStyleProvider>
    </ConfigProvider>
  )
}