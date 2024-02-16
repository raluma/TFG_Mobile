import { create } from 'zustand'

export const useModalStore = create((set) => {
    return {
        id: null,
        visible: false,
        setId: (id: number) => set(() => ({ id })),
        setVisible: (visible: boolean) => set(() => ({ visible }))
    }
})