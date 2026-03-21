import stylesObj from './RootLayout.module.css';
import Header from '@components/layout/Header/Header'
import Sidebar from '@components/layout/Sidebar/Sidebar';
import BaseContainer from '@components/layout/BaseContainer/BaseContainer'
import Breadcrumbs from '@components/layout/Breadcrumbs/Breadcrumbs'
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { Suspense } from 'react';
import useTaskStore from '@/store/useTaskStore';

export const loader = async () => {
    const loadTask = useTaskStore(state => state.loadTasks);
    const isLoading = useTaskStore(state => state.isLoading);

    if (!isLoading) loadTask();
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
