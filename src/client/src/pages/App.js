import logo from '../logo.svg';
import './App.css';
import HuntPage from './hunt/huntPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HuntPage></HuntPage>
      </header>
    </div>
  );
}

export default App;
