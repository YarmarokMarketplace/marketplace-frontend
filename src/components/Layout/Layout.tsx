import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import { MainContainer } from "./style";
import CustomDrawer from "../CustomDrawer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MainContainer maxWidth={false} disableGutters>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <CustomDrawer />
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
