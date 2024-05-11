import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
    token: string,
}
type Actions = {
    setToken: (token: string) => void,
}


export const useAuthStore = create<Store & Actions>()(
    persist(
    (set) => ({
        token: "",
        setToken: (token) => set((state) => ({ token })),
    }), {
        name: 'auth'
    }
))