import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import stylesObj from './RootLayout.module.css';
import Header from '@components/entities/layout/Header/Header'
import Sidebar from '@components/entities/layout/Sidebar/Sidebar';
import BaseContainer from '@components/entities/layout/BaseContainer/BaseContainer'
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import useAuthStore from '@/store/useAuthStore';

export const Component = () => {
    const checkAuth = useAuthStore(store => store.checkAuth);
    useEffect(() => { checkAuth() }, [checkAuth])

    return (
        <ProtectedRoute>
            <Suspense fallback={null}>
                <div className={stylesObj.container}>
                    <Header />
                    <Sidebar />
                    <BaseContainer>
                        <Outlet />
                    </BaseContainer>
                </div>
            </Suspense>
        </ProtectedRoute>
    )
}
