import React from 'react';
import { Button, TextInput } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';
import { useAlertDispatch } from '../utils/AlertContext';
import { joinHunt } from '../services/huntService';

export default function JoinHuntPage() {
  const [submitButtonLoading, setSubmitButtonLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [codeExists, setCodeExists] = React.useState(false);
  const [playerName, setPlayerName] = React.useState('');

  const alertDispatch = useAlertDispatch();
  const navigate  = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    if (params.code) {
      setCode(params.code);
      setCodeExists(params.code !== undefined && params.code !== '');

      // TODO: get hunt details
    }
  }, [params.code]);

  async function onSubmitClick() {
    const joinDetails = { huntCode: code, playerName };
    setSubmitButtonLoading(true);

    console.debug('Joining hunt', joinDetails);
    
    try {
      // TODO: call web api to join hunt with code and player details
      const hunt = await joinHunt(code, playerName.trim());
      navigate(`/hunt/${hunt.huntId}`);
    }
    catch (err) {
      console.error('JoinHuntPage: Error', err);
      alertDispatch({ type: 'error', message: 'Failed to join hunt', show: true });
      setSubmitButtonLoading(false);
    }

  }

  return (
    <>
      {!codeExists && (
        <>
          <TextInput label="Hunt Code" placeholder="Enter hunt code" value={code} onChange={e => setCode(e.currentTarget.value)} withAsterisk />
          <Button onClick={() => navigate(`/hunt/join/${code}`)}>Join Hunt</Button>
        </>
      )}

      {codeExists && (
        <>
          {/* TODO: show hunt details in the Card.Header */}
          <TextInput label="Player Name" placeholder="Enter name" value={playerName} onChange={e => setPlayerName(e.currentTarget.value)} withAsterisk />
          <Button disabled={playerName.trim() === ''} loading={submitButtonLoading} onClick={onSubmitClick}>Submit</Button>
        </>
      )}
    </>
  )
}