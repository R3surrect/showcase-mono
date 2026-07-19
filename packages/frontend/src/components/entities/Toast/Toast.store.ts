import { create } from "zustand";
import type { ToastStore } from "./Toast.types";

const useToastStore = create<ToastStore>((set) => ({
    toastList: [],
    pushToast: (data) => set((prev) => ({
        toastList: [...prev.toastList, data],
    })),

    closeToast: (id) => set((prev) => ({
        toastList: prev.toastList.filter(item => item.id !== id)
    })),
}))

export default useToastStore;