import { atomWithStorage } from 'jotai/utils'

export type ThemeMode = 'light' | 'dark'

export const themeAtom = atomWithStorage<ThemeMode>('theme', 'light')