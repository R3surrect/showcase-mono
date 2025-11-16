import './RootLayout.css';
import Header from '@components/layout/Header/Header'
import Sidebar from '@components/layout/Sidebar/Sidebar';
import BaseContainer from '@components/layout/BaseContainer/BaseContainer'
import Breadcrumbs from '@components/layout/Breadcrumbs/Breadcrumbs'
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className='layout-container'>
            <Header />
            <Sidebar />
            <Breadcrumbs/>
            <BaseContainer>
                <Outlet />
            </BaseContainer>
        </div>
    )
}

export default RootLayout;