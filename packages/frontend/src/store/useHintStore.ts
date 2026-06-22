import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HintStore {
    data: Record<string, boolean>,
    dismissHint: (key: string) => void;
}

export const useHintStore = create<HintStore>()(
    persist(
        (set) => ({
            data: {},
            dismissHint: (key) => set((state) => ({
                data: {
                    ...state.data,
                    [key]: true
                }
            })),
        }),
        { name: 'app-hints-store' }
    )
)