import React, { lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from '../Layout';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import FallbackComponent from '../FallbackComponent';
import NotFoundPage from '../NotFoundPage';
import { useSelector } from 'react-redux';
import { userRegisterStateSelector } from 'redux/auth/selector';
import { logErrorToService } from '../../utils/utils';
import Articles from '../pages/Articles';

import SingleProductPage from '../pages/SingleProductPage';
import ProfilePage from '../pages/ProfilePage';
import AddProduct from '../pages/AddProduct';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import SearchPage from '../pages/SearchPage';
import { CategoryListPage } from '../pages/HomePage/CategoryListModal';

const EditProduct = lazy(() => import('../pages/AddProduct/EditProduct'));

const App: React.FC = () => {
  const { isAuth } = useSelector(userRegisterStateSelector);

  useEffect(() => {
    localStorage.setItem(
      'regInput',
      JSON.stringify({ name: '', email: '', password: '', confirmPassword: '' })
    );
  }, [isAuth]);
  useEffect(() => {
    localStorage.setItem(
      'logInput',
      JSON.stringify({ email: '', password: '' })
    );
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state
      }}
      resetKeys={['someKey']}
      onError={logErrorToService}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/all-categories' element={<CategoryListPage />} />
            <Route path='/profile/*' index element={<ProfilePage />} />
            <Route path='/rules/*' index element={<Articles />} />
            <Route path='/:categoryName' element={<CategoryPage />} />
            <Route path='/:categoryName/:id' element={<SingleProductPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/add-advert' element={<AddProduct />} />
            <Route path='/edit-advert/:id' element={<EditProduct />} />
            <Route
              path='/api/auth/reset-password/:resetId/:resetToken'
              element={<ResetPassword />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
