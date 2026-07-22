import { api } from "@/shared/api/api"

export const AuthService = {
    async logout() {
        const res = await api.auth.logout.$post();
        if (!res.ok) throw new Error(`Logout failed: ${res.status}: ${res.statusText}`);

        return;
    }
}