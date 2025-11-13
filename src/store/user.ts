import { atom } from 'jotai'

export interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
}

export const userAtom = atom<UserInfo | null>(null)