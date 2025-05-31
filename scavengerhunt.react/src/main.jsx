import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { MantineProvider } from '@mantine/core';

import App from './pages/App';
import ClueAdminPage from './pages/ClueAdminPage';
// import CluePage from './pages/cluePage';
import HuntPage from './pages/HuntPage';
import { theme } from "./theme";

import './index.css';
import '@mantine/core/styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/hunt' element={<HuntPage />} />
          <Route path='/clue/admin/:huntid' element={<ClueAdminPage />} />
          {/* <Route path='/clue/:clueid' element={<CluePage />} /> */}
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
