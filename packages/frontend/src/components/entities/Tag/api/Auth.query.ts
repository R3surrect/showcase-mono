import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "./Auth.service";

export const authKeys = { all: ['logout'] as const }

export const useLogoutQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => await AuthService.logout(),
        onSuccess: () => {
            queryClient.clear();
            navigate('/auth/login');
        },
        onError: (error) => console.error('Logout error', error)
    });
}