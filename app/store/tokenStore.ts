import { create } from 'zustand'

interface ITokenStore {
  token: string
  setToken: (value: string) => void
}

export const useTokenStore = create<ITokenStore>((set) => ({
  token: '',
  setToken: (value) => set({ token: value }),
}))