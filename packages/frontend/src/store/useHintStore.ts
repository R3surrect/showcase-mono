import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HintStore {
    data: Record<string, boolean>,
    dismissHint: (key: string) => void;
    isHintDismissed: (key: string) => boolean;
}

export const useHintStore = create<HintStore>()(
    persist(
        (set, get) => ({
            data: {},
            dismissHint: (key) => set((state) => ({
                data: {
                    ...state.data,
                    [key]: true
                }
            })),

            isHintDismissed: (key) => !!get().data[key]
        }),
        { name: 'app-hints-store' }
    )
)