import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import logo from '../logo.svg';
import './App.css';
import HuntPage from './hunt/huntPage';
import ClueAdminPage from './clue/clueAdminPage';
import CluePage from './clue/cluePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route exact path='/' component={HuntPage} />
          <Route path='/clue/admin/:huntid' component={ClueAdminPage} />
          <Route path='/clue/:clueid' component={CluePage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
