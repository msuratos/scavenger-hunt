import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import logo from '../logo.svg';
import './App.css';
import HuntPage from './hunt/huntPage';
import ClueAdmin from './clue/clueAdmin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route exact path='/' component={HuntPage} />
          <Route path='/clue/admin/:huntid' component={ClueAdmin} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
