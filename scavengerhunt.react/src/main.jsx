import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Avatar, Card, CardContent, CardHeader, Divider } from "ui-neumorphism";

import App from './pages/App';
import ClueAdminPage from './pages/clueAdminPage';
import CluePage from './pages/cluePage';
import HuntPage from './pages/huntPage';

import logo from './assets/images/astro-blue.png';
import 'ui-neumorphism/dist/index.css';
import './index.css';

const avatar = (<Avatar src={logo} style={{ width: 'auto' }} size={125} bgColor='var(--white)' className="avatar-custom" />);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div style={{ display: 'flex', marginTop: '.5rem', placeContent: 'center' }}>
        <Card className="card-custom" rounded>
          <CardHeader avatar={avatar} className="card-header-custom" rounded />
          <CardContent>
            <div className="title">
              <label className="title-name">ASTRO BLUE</label>
              <label className="title-desc">TURNS ONE!</label>
            </div>
            <Divider dense />
            <Router>
              <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/hunt' component={HuntPage} />
                <Route path='/clue/admin/:huntid' component={ClueAdminPage} />
                <Route path='/clue/:clueid' component={CluePage} />
              </Switch>
            </Router>
          </CardContent>
        </Card>
      </div>
    </Router>
  </React.StrictMode>
);
