import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
            <Footer />
        </>
    );
};

export default Layout;