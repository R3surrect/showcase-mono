import { create } from "zustand";
import type AuthState from "@/types/Auth/AuthState";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(persist((set) => ({

    authData: {
        user: null,
        authStatus: 'unknown',
    },

    status: undefined,
    isLoading: false,

    login: async (authFields) => {
        set({ isLoading: true });

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(authFields),

                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-By': 'XMLHttpRequest'
                },
            })

            if (res.ok) {
                set({ isLoading: false });
                const data = await res.json();

                set({
                    authData: {
                        authStatus: 'authenticated',
                        user: data.user
                    }
                });
                return { success: true };
            } else {
                set({ status: res.status, isLoading: false });
                return { success: false, status: res.status, message: res.statusText };
            }
        } catch (e: unknown) {

            set({
                isLoading: false,
                status: undefined
            });

            if (e instanceof Error) console.log(e.message);

            return {
                success: false,
                status: undefined,
                message: 'Network Error'
            };
        }
    },

    checkAuth: async () => {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'X-Requested-By': 'XMLHttpRequest' }
        });

        if (res.ok) {
            const data = await res.json();

            set({
                authData: {
                    authStatus: 'authenticated',
                    user: data.user
                }
            });
        } else {
            console.warn('checkAuth failed: ', {
                status: res.status,
                statusText: res.statusText,
            });

            set({
                authData: {
                    authStatus: "unauthenticated",
                    user: null
                }
            });
        };
    },

    register: async (authFields) => {
        set({ isLoading: true });
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-By': 'XMLHttpRequest',
                },
                body: JSON.stringify(authFields)
            });

            if (res.ok) {
                const data = await res.json();
                
                set({
                    authData: {
                        authStatus: "authenticated",
                        user: data.user,
                    }
                })
                console.log(data);
                return {
                    success: true
                }
            } else {
                const errorData = await res.json().catch(() => ({}));

                console.warn('register failed: ', {
                    status: res.status,
                    statusText: res.statusText,
                });
                
                set({
                    isLoading: false,
                    status: res.status,
                });

                return {
                    success: false,
                    status: res.status,
                    message: errorData.message || res.statusText
                };

            }
        } catch (e: unknown) {
            set({ isLoading: false, status: undefined });

            if (e instanceof Error) console.log(e.message);

            return {
                success: false,
                message: "Connection error. Please check your internet or try again later"
            };
        };
    },

    logout: async () => {
        set({
            authData: {
                user: null,
                authStatus: 'unauthenticated',
            }
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
        return { message: '', status: 0, success: true }
    }
}), {
    name: "AuthStorage",
    partialize: (state) => ({
        authData: state.authData
    })
}));

export default useAuthStore;
