import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

import { currentFetch } from "../../components/DrawerContent/thunk";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentFetch());
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout;
