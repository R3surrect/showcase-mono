import { create } from "zustand";
import type AuthState from "@/types/Auth/AuthState";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(persist((set) => ({
    authData: {
        user: null,
        authStatus: 'unknown',
    },

    error: null,
    status: null,
    isLoading: false,

    login: async (authFields) => {
        set({isLoading: true});
        
        try {

            const res = await fetch (`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', 
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(authFields),
            })

        if (res.ok) {
            set({isLoading: false});
            
            const data = await res.json();
            set(state => ({
                authData: {
                    ...state.authData,
                    authStatus: 'authenticated',
                    user: data.user
                }
            }));
            
            return { success: true, status: null, message: null };

        } else {

            set({error: res.statusText, status: res.status, isLoading: false});

            setTimeout(() => set({error: null, status: null}), 5000);

            return {success: false, status: res.status, message: res.statusText}
        }
        } catch (e: unknown) {
            const errorPayload = {
                isLoading: false,
                status: null,
                error: "Network Error"
            };

            set(errorPayload);

            if (e instanceof Error) console.log(e.message);

            return {
                success: false,
                status: errorPayload.status,
                message: errorPayload.error
            };
        }
    },

    checkAuth: async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api/v1/auth/me`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
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
    
    register: async (authFields) => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/v1/register`, {
            method: 'POST',
            credentials: 'include',

            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(authFields)

        });
        //! Заглушка
        console.log(res.body);
        return new Promise(() => {
            return {}
        })

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
        return {message: '', status: 0, success: true}
    }
}), {
    name: "AuthStorage",
    partialize: (state) => ({
        authData: state.authData
    })
}));

export default useAuthStore;
