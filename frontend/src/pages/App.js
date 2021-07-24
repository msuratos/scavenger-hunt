import { useHistory } from "react-router-dom";
import { Button } from "ui-neumorphism";
import './App.css';

const App = () => {
  const history = useHistory();
  const onClick = () => {
    history.push('/clue/FEA65DFE-77D2-4E62-70BD-08D94E706AC8');
  };

  return (
    <>
      <p>This is a scavanger hunt for the following hunt.</p>
      <Button style={{width: '100%'}} color='var(--light-bg-light-shadow)' bgColor='var(--primary)' onClick={onClick}>Start</Button>
    </>
  );
}

export default App;