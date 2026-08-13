import { create } from "zustand";
import type AuthState from "@/types/Auth/AuthState";
import { persist } from "zustand/middleware";

const baseUrl = `${import.meta.env.VITE_BACKEND_API_URL}:${import.meta.env.VITE_BACKEND_API_PORT}/api`

type FetchApi = (endpoint: string[], options: RequestInit, version?: number) => Promise<Response>;

const fetchApi: FetchApi = async (endpoint, options, version = 1) => {
    return await fetch(`${baseUrl}/v${version}/${endpoint.join('/')}`, {
        credentials: 'include',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-By': 'XMLHttpRequest',
            ...options.headers
        },
    })
};

const storeOptionsData = {
    name: "AuthStorage",
    partialize: (state: AuthState) => ({
        authData: state.authData
    })
};

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
            const endpoint = ['auth', 'login'];
            const res = await fetchApi(endpoint,
                {
                    method: 'POST',
                    body: JSON.stringify(authFields),
                }
            )

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
        const endpoint = ['auth', 'me'];
        const res = await fetchApi(endpoint, { method: 'GET' });

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
            const endpoint = ['auth', 'register'];

            const res = await fetchApi(endpoint, {
                method: 'POST',
                body: JSON.stringify(authFields),
            });

            if (res.ok) {
                const data = await res.json();
                set({
                    authData: {
                        authStatus: "authenticated",
                        user: data.user,
                    }
                })

                return { success: true }

            } else {
                const errorData = await res.json().catch(() => {
                    console.warn('register failed: ', {
                        status: res.status,
                        statusText: res.statusText,
                    });

                    return {};
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
            const endpoint = ['auth', 'logout'];
            await fetchApi(endpoint, { method: 'POST' });
        }
        catch (e) {
            console.error(`logout failed`, e);
        }

        return { message: '', status: 0, success: true }
    }
}), storeOptionsData));

export default useAuthStore;
