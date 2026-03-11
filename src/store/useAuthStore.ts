import { create } from "zustand";
import type AuthState from "@/types/Auth/AuthState";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(persist((set) => ({
    authData: {
        user: null,
        authStatus: 'unknown',
    },

    loginFormData: {
        email: '',
        password: '',
    },

    token: null,

    login: async (data) => {
        console.log(`valid data: ${data}`)
    },

    checkAuth: async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/me`, {
            method: 'POST',
            credentials: 'include',
        })

        if (res.ok) {
            const data = await res.json();
            set((state) => ({
                authData: {
                    ...state.authData,
                    authStatus: 'authenticated',
                    user: data.user
                }
            }));
        } else {
            console.warn('checkAuth failed: ', {
                status: res.status,
                statusText: res.statusText,
            });

            set((state) => ({
                authData: {
                    ...state.authData,
                    authStatus: "unauthenticated",
                    user: null
                }
            }));
        }
    },
    
    register: async () => {
        // set((state) => ({
        //     registerData: {
        //         ...state.registerFormData
        //     }
        // }))
    },

    logout: async () => {
        set((state) => ({
            authData: {
                ...state.authData,
                authStatus: 'unauthenticated',
                user: null,
            }
        }));

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
}), {
    name: "AuthStorage",
    partialize: (state) => ({
        authStatus: state.authData.authStatus
    })
}));

export default useAuthStore;
