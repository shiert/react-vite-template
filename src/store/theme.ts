import { atomWithStorage } from 'jotai/utils'

// Ant Design 预设主题色
export const PRESET_COLORS = {
  daybreak: '#1677ff', // 拂晓蓝（默认）
  dust: '#f5222d', // 薄暮（红色）
  volcano: '#fa541c', // 火山（橙红）
  sunset: '#fa8c16', // 日暮（橙色）
  calendula: '#faad14', // 金盏花（黄色）
  sunrise: '#52c41a', // 极光绿（绿色）
  cyan: '#13c2c2', // 明青（青色）
  geekblue: '#2f54eb', // 极客蓝（蓝紫）
  purple: '#722ed1', // 酱紫（紫色）
  magenta: '#eb2f96', // 法式洋红（粉色）
} as const

export type ThemeColor = (typeof PRESET_COLORS)[keyof typeof PRESET_COLORS]

// 同步读取 localStorage 中的主题色，避免闪烁
const getInitialTheme = (): ThemeColor => {
  try {
    const stored = localStorage.getItem('theme')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed as ThemeColor
    }
  } catch {
    // 忽略错误，使用默认值
  }
  return PRESET_COLORS.daybreak
}

export const themeAtom = atomWithStorage<ThemeColor>('theme', getInitialTheme())
