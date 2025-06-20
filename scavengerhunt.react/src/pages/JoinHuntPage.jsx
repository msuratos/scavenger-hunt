import React from 'react';
import { Button, Card, Center, Image, TextInput, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';
import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt, joinHunt } from '../services/huntService';

export default function JoinHuntPage() {
  const [submitButtonLoading, setSubmitButtonLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [codeExists, setCodeExists] = React.useState(false);
  const [hunt, setHunt] = React.useState({ title: '', subtitle: '' });
  const [playerName, setPlayerName] = React.useState('');

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    async function getHuntDetails(code) {
      try {
        const hunt = await getHunt(undefined, code);
        setHunt(hunt);
      }
      catch (err) {
        console.error('Failed to get hunt details', err);
        alertDispatch({ type: 'error', message: err.message, show: true });
        navigate('/');
      }
    }

    if (params.code) {
      setCode(params.code);
      setCodeExists(params.code !== undefined && params.code !== '');

      getHuntDetails(params.code);
    }
  }, [params.code]);

  async function onSubmitClick() {
    const joinDetails = { huntCode: code, playerName };
    setSubmitButtonLoading(true);

    console.debug('Joining hunt', joinDetails);

    try {
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
          <Card.Section>
            <Image alt={hunt.title} />
          </Card.Section>

          <Center>
            <Title order={3}>{hunt.title}</Title>
          </Center>
          <Center>
            <Title order={4}>{hunt.subtitle}</Title>
          </Center>

          <TextInput label="Player Name" placeholder="Enter name" value={playerName} onChange={e => setPlayerName(e.currentTarget.value)} withAsterisk />
          <Button disabled={playerName.trim() === ''} loading={submitButtonLoading} onClick={onSubmitClick}>Submit</Button>
        </>
      )}
    </>
  )
}