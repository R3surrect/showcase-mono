import { create } from "zustand";

export const TOAST_TYPES = ['error', 'warning', 'success', 'info'] as const;
export type ToastTypes = typeof TOAST_TYPES[number];

export interface ToastData {
    id: number;
    label: string;
    text?: string;
    status: ToastTypes;
}

export interface ToastStore {
    toastList: ToastData[];
    pushToast: (data: ToastData) => void;
    closeToast: (id: number) => void;
}

const useToastStore = create<ToastStore>((set) => ({
    toastList: [],
    pushToast: (data) => set((prev) => ({
        toastList: [...prev.toastList, data],
    })),

    closeToast: (id) => set((prev) => {
        const index = prev.toastList.find(item => item.id === id);

        if (index !== -1) return prev.toastList.splice(index, 1);
    })
}))

export default useToastStore;