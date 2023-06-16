import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Layout from '../Layout';

const App: React.FC = () => {
  console.log("Hello world");
  return (
    <>
      <CssBaseline />

      <Router>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App;
