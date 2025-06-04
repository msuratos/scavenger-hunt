import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { MantineProvider } from '@mantine/core';

import App from './pages/App';
import ClueAdminPage from './pages/ClueAdminPage';
import CluePage from './pages/CluePage';
import HuntsPage from './pages/HuntsPage';
import Alert from './components/Alert';
import Layout from './components/Layout';
import { AlertProvider } from "./utils/AlertContext";
import { theme } from "./utils/theme";

import './index.css';
import '@mantine/core/styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AlertProvider>
        <Alert />

        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<App />} />
              <Route path='/hunts' element={<HuntsPage />} />
              <Route path='/clue/admin/:huntid' element={<ClueAdminPage />} />
              <Route path='/clue/:clueid' element={<CluePage />} />
              <Route path="*" element={<><h1>Error</h1><p>Page Not Found!</p></>} />
            </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </MantineProvider>
  </React.StrictMode>
);
