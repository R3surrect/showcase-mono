import { create } from "zustand";
import type { ToastStore } from "./Toast.types";

const useToastStore = create<ToastStore>((set) => ({
    toastList: [],

    pushToast: (data) => set((prev) => ({
        toastList: [...prev.toastList, data],
    })),

    deleteToast: (item) => {
        item.onClose?.();
        set(state => ({
            toastList: state.toastList.filter(toast => toast.id !== item.id)
        }))
    },

}))

export default useToastStore;