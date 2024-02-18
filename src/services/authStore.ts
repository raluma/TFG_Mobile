import { create } from 'zustand';

export const useAuthStore = create((set) => {
    return {
        action: "login",
        setAction: (action: string) => set(() => ({ action }))
    }
})