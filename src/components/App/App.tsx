import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import { useSelector } from "react-redux";
import { userRegisterStateSelector } from "../DrawerContent/selector";

const App: React.FC = () => {
  const { isAuth } = useSelector(userRegisterStateSelector);
  useEffect(() => {
    localStorage.setItem(
      "regInput",
      JSON.stringify({ name: "", email: "", password: "", confirmPassword: "" })
    );
  }, [isAuth]);
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:categoryName" element={<CategoryPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
