import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppFooter from '../AppFooter';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            {/* <Header /> */}
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
            <AppFooter />
        </>
    );
};

export default Layout;