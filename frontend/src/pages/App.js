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
      <h5>Welcome to the Scavenger Hunt!</h5>
      <p>Riddles will be displayed in your browser after scanning the QR code you find after each clue.</p>
      <p>
        There are <b>6 QR Codes</b> hidden around the park. Each QR Code will contain a letter, you <b><i>must keep track</i></b>
        &nbsp;of all the letters! You will need to figure out the word and present the word to someone with your dog 🐶🐕‍🦺 at the end
        &nbsp;of your hunt.
      </p>
      <p>
        First <b><i>7 winners</i></b> will be given a prize upon completion!
        Enjoy & have fun playing! 😊🚀
        </p>
      <p>Click <b>Start</b> to receive the 1st clue!</p>
      <Button style={{width: '100%'}} color='var(--light-bg-light-shadow)' bgColor='var(--primary)' onClick={onClick}>Start</Button>
    </>
  );
}

export default App;