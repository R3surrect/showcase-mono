import type User from "./User";
import { loginInput } from '@/validation/loginSchema';

export default interface AuthState {
    authData: {
        authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
        user: User | null;
    };
    
    loginFormData: {
        email: '';
        password: '';
    };

    token: string | null;

    checkAuth: () => Promise<void>;
    login: (data: loginInput) => void;
    logout: () => void;
    register: () => void;
}
