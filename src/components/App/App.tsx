import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';;

import Layout from '../Layout';
import HomePage from '../pages/HomePage';

const App: React.FC = () => {
  console.log("Hello world");
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App;
