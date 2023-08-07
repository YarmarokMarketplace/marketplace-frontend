import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";

const App: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("sort", "newest");
    localStorage.setItem(
      "regInput",
      JSON.stringify({ name: "", email: "", password: "", confirmPassword: "" })
    );
  }, []);
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
