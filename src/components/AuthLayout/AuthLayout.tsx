import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

import { currentFetch } from 'redux/auth/thunk';
import { userAuthStateSelector } from 'redux/auth/selector';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLogin } = useSelector(userAuthStateSelector);

  useEffect(() => {
    dispatch(currentFetch());
  }, [isLogin]);

  return <>{children}</>;
};

export default AuthLayout;
