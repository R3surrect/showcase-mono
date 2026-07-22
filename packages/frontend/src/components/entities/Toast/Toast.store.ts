import { create } from "zustand";
import type { ToastStore } from "./Toast.types";

const useToastStore = create<ToastStore>((set) => ({
    toastList: [],

    pushToast: (data) => set((prev) => {
        const hasSimilar = prev.toastList.some(
            (item) => item.label === data.label && item.text === data.text
        );

        if (hasSimilar) return prev;
        else return {
            toastList: [
                ...prev.toastList,
                Object.assign({ id: crypto.randomUUID() }, data)
            ]
        }
    }),

    deleteToast: (item) => {
        item.onClose?.();
        set(state => ({
            toastList: state.toastList.filter(toast => toast.id !== item.id)
        }))
    },

}))

export default useToastStore;