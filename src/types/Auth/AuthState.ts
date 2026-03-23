import type User from "./User";
import type { LoginInput } from '@/validation/loginSchema';
import type { RegisterInput } from '@/validation/registerSchema';

interface Request {
    success: boolean;
    status: number | null;
    message: string | null
}

export default interface AuthState {
    authData: {
        authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
        user: User | null;
    };

    error: string | null;
    status: number | null;
    isLoading: true | false;
    
    login: (data: LoginInput) => Promise<Request>;
    
    logout: () => Promise<Request>;
    register: (data: RegisterInput) => Promise<Request>;
    checkAuth: () => Promise<void>;
}
