import type User from "./User";

export default interface AuthState {
    authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
    user: User | null;

    checkAuth: () => Promise<void>;
    logout: () =>  void;
}