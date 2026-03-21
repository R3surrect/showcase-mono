import type User from "./User";
import type { loginInput } from '@/validation/loginSchema';

export default interface AuthState {
    authData: {
        authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
        user: User | null;
    };

    error: string | null;
    status: number | null;
    isLoading: true | false;
    
    login: (data: loginInput) => Promise<
    {
        success: boolean;
        status: number | null;
        message: string | null
    }>;
    
    logout: () => void;
    register: () => void;
    checkAuth: () => Promise<void>;
}
