import { ConfigProvider } from 'antd'
import { ThemeProvider as AntdStyleProvider } from 'antd-style'
import { useAtomValue } from 'jotai'
import { themeAtom } from '@/store/theme'
import zhCN from 'antd/locale/zh_CN'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeColor = useAtomValue(themeAtom)

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: themeColor,
        },
      }}
    >
      <AntdStyleProvider>{children}</AntdStyleProvider>
    </ConfigProvider>
  )
}
