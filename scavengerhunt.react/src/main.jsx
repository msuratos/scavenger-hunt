import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { 
  Button, 
  Card, 
  Center, 
  Image, 
  MantineProvider, 
  Text
} from '@mantine/core';

// import App from './pages/App';
// import ClueAdminPage from './pages/clueAdminPage';
// import CluePage from './pages/cluePage';
// import HuntPage from './pages/huntPage';

import logo from './assets/images/main-logo.png';
import './index.css';
import '@mantine/core/styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider>
      {/* <Router> */}
      <Center maw='100vw' h='100vh'>
        <Card withBorder padding="lg" radius="md" className='card' style={{ width: '300px' }}>
          <Card.Section>
            <Image src={logo} alt="Dog" fit="contain" height={100} mt={5} />
          </Card.Section>

          <Center>
            <Text className='title' size="xl">SCAVENGER HUNT</Text>
          </Center>

          <Center>
            <Text className='title'>HUNTING TIME!</Text>
          </Center>

          <Card.Section p={5}>
            <Button mb={5} fullWidth>Join Hunt</Button>
            <Button mb={5} fullWidth>Create Hunt</Button>
          </Card.Section>

          {/* <Divider dense />

              <Router>
                <Switch>
                  <Route exact path='/' component={App} />
                  <Route exact path='/hunt' component={HuntPage} />
                  <Route path='/clue/admin/:huntid' component={ClueAdminPage} />
                  <Route path='/clue/:clueid' component={CluePage} />
                </Switch>
              </Router> */}
        </Card>
      </Center>
      {/* </Router> */}
    </MantineProvider>
  </React.StrictMode>
);
