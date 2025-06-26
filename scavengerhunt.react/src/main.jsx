import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/en';

import App from './pages/App';
import HuntPage from "./pages/HuntPage";
import PlayerLayout from './components/PlayerLayout';
import HuntsPage from './pages/HuntsPage';
import ItemAdminPage from './pages/ItemAdminPage';
import ItemPage from './pages/ItemPage';
import JoinHuntPage from "./pages/JoinHuntPage";
import PlayerItemPage from "./pages/PlayerItemPage";

import Alert from './components/Alert';
import Layout from './components/Layout';

import { AlertProvider } from "./utils/AlertContext";
import { theme } from "./utils/theme";

import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <DatesProvider settings={{ firstDayOfWeek: 0 }}>
        <AlertProvider>
          <Alert />

          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<App />} />

                <Route path='hunt'>
                  <Route path=":huntid" element={<PlayerLayout />}>
                    <Route index element={<HuntPage />} />
                    <Route path='item/:itemid' element={<PlayerItemPage />} />
                  </Route>

                  <Route path=':huntid/moderator' element={<><h1>Moderator</h1></>} />
                  <Route path='join/:code?' element={<JoinHuntPage />} />
                </Route>

                <Route path='admin'>
                  <Route path='hunts' element={<HuntsPage />} />
                  <Route path='item/admin/:huntid' element={<ItemAdminPage />} />
                  <Route path='item/:itemid' element={<ItemPage />} />
                </Route>

                <Route path="*" element={<><h1>Error</h1><p>Page Not Found!</p></>} />
              </Route>
            </Routes>
          </Router>
        </AlertProvider>
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>
);
