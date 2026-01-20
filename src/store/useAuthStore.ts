import { create } from "zustand";
import type AuthState from "@/types/Auth/AuthState";

const useAuthStore = create<AuthState>(set => ({
    authStatus: 'unknown',
    user: null,

    checkAuth: async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/me`, {
            method: 'POST',
            credentials: 'include',
        })

        if (res.ok) {
            const data = await res.json();
            set({ authStatus: 'authenticated', user: data.user });
        } else {
            console.warn('checkAuth failed: ', {
                status: res.status,
                statusText: res.statusText,
            });

            set({ authStatus: "unauthenticated", user: null });
        }
    },

    logout: async () => {
        set({
            authStatus: 'unauthenticated',
            user: null,
        });

        try {
            await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/logout`, {
                method: 'POST',
                credentials: "include",
            });
        }
        catch (e) {
            console.error(`logout request failed, will rely on session expiration. err: ${e}`);
        }
    }
}))

export default useAuthStore;