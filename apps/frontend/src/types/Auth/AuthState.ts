import type User from "./User";
import type { LoginInput } from '@/validation/loginSchema';
import type { RegisterPayload } from '@/validation/registerSchema';

interface AuthRequest {
    success: boolean;
    status?: number;
    message?: string
}

export default interface AuthState {
    authData: {
        authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
        user: User | null;
    };

    // error: string | null;
    status?: number;
    isLoading: boolean;
    
    login: (data: LoginInput) => Promise<AuthRequest | void>;
    logout: () => Promise<AuthRequest>;
    register: (data: RegisterPayload) => Promise<AuthRequest | void>
    checkAuth: () => Promise<void>;
}
