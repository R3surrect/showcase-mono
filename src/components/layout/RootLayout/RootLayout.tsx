import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import stylesObj from './RootLayout.module.css';
import Header from '@components/layout/Header/Header'
import Sidebar from '@components/layout/Sidebar/Sidebar';
import BaseContainer from '@components/layout/BaseContainer/BaseContainer'
import Breadcrumbs from '@components/layout/Breadcrumbs/Breadcrumbs'
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import useTaskStore from '@/store/useTaskStore';

//* Don't use hooks outside components!

export const loader = async () => {
    const { loadTasks, isLoading } = useTaskStore.getState();

    if (!isLoading) await loadTasks();

    return null;
}

export const Component = () => {
    return (
        <ProtectedRoute>
            <Suspense fallback={null}>
                <div className={stylesObj.layoutContainer}>
                    <Header />
                    <Sidebar />
                    <Breadcrumbs />
                    <BaseContainer>
                        <Outlet />
                    </BaseContainer>
                </div>
            </Suspense>
        </ProtectedRoute>
    )
}
