import useAuthStore from "@/store/useAuthStore";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element;
}

const ProtectedRoute = ({children}: Props) => {
    const authStatus = useAuthStore(state => state.authStatus);

    if (authStatus === 'unknown') {
        //TODO Прикрутить loader
        return <div>Checking auth...</div> 
    }

    if (authStatus === 'unauthenticated') {
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default ProtectedRoute;