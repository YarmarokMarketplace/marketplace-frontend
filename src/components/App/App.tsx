import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'

import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import FallbackComponent from "../FallbackComponent";
import NotFoundPage from "../NotFoundPage";
import { useSelector } from "react-redux";
import { userRegisterStateSelector } from "../DrawerContent/selector";
import { logErrorToService } from '../../utils/utils'
import { SecurityRules } from "../pages/Articles";
import ProfilePage from "../pages/ProfilePage";

const App: React.FC = () => {
  const { isAuth } = useSelector(userRegisterStateSelector);
  useEffect(() => {
    localStorage.setItem(
      "regInput",
      JSON.stringify({ name: "", email: "", password: "", confirmPassword: "" })
    );
  }, [isAuth]);
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
            <Route path="/" element={<HomePage />} />
            <Route path="/:categoryName" element={<CategoryPage />} />
            <Route path="/security-rules" element={<SecurityRules />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
