import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import stylesObj from './RootLayout.module.css';
import Header from '@components/entities/layout/Header/Header'
import Sidebar from '@components/entities/layout/Sidebar/Sidebar';
import BaseContainer from '@components/entities/layout/BaseContainer/BaseContainer'
import ProtectedRoute from '@/components/shared/ProtectedRoute';

export const Component = () => {

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
