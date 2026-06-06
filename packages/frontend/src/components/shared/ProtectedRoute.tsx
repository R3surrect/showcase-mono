import useAuthStore from "@/store/useAuthStore";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element;
}

const ProtectedRoute = ({children}: Props) => {
    const authStatus = useAuthStore(state => state.authData.authStatus);

    if (authStatus === 'unknown') {
        return <div>Checking auth...</div> 
    }

    if (authStatus === 'unauthenticated') {
        return <Navigate to="/auth/login" replace/>
    }

    return children;
}

export default ProtectedRoute;
