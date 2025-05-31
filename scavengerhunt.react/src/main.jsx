import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Card, Center, Group, Image, MantineProvider, RingProgress, Text } from '@mantine/core';

// import App from './pages/App';
// import ClueAdminPage from './pages/clueAdminPage';
// import CluePage from './pages/cluePage';
// import HuntPage from './pages/huntPage';

import logo from './assets/images/astro-blue.png';
import '@mantine/core/styles.css';
import './index.css';

// const avatar = (<Avatar src={logo} style={{ width: 'auto' }} size={125} bgColor='var(--white)' className="avatar-custom" />);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider>
      {/* <Router> */}
        <Center>
          <Card className="card-custom">
            <Card.Section>
              <Image src={logo} alt="Dog" fit="contain" height={100} />
            </Card.Section>

            <Group>
              <div className="title">
                <label className="title-name">ASTRO BLUE</label>
                <label className="title-desc">TURNS ONE!</label>
              </div>

              {/* <Divider dense />

              <Router>
                <Switch>
                  <Route exact path='/' component={App} />
                  <Route exact path='/hunt' component={HuntPage} />
                  <Route path='/clue/admin/:huntid' component={ClueAdminPage} />
                  <Route path='/clue/:clueid' component={CluePage} />
                </Switch>
              </Router> */}
            </Group>
          </Card>
        </Center>
      {/* </Router> */}
    </MantineProvider>
  </React.StrictMode>
);
