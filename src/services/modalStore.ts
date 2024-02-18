import { create } from 'zustand'
import { Item } from '../types/agenda'

export const useModalStore = create((set) => {
    return {
        item: undefined,
        visible: false,
        setItem: (item: Item) => set(() => ({ item })),
        setVisible: (visible: boolean) => set(() => ({ visible }))
    }
})