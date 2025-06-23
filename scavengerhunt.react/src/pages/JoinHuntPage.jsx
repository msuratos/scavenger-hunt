import React, { useState } from 'react';
import { Button, Card, Center, Image, TextInput, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';
import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt, joinHunt } from '../services/huntService';
import { isPlayerValid } from '../services/playerService';

export default function JoinHuntPage() {
  const [code, setCode] = React.useState('');
  const [codeExists, setCodeExists] = React.useState(false);
  const [hunt, setHunt] = React.useState({ title: '', subtitle: '' });
  const [playerName, setPlayerName] = React.useState('');
  const [submitButtonLoading, setSubmitButtonLoading] = React.useState(false);

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    async function getDetails(code) {
      try {
        const huntPromise = getHunt(undefined, code);
        const isPlayerValidPromise = isPlayerValid();

        await Promise.all([huntPromise, isPlayerValidPromise]);

        const hunt = await huntPromise;
        const isValid = await isPlayerValidPromise;
        if (isValid) navigate(`/hunt/${hunt.huntId}`);

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
      getDetails(params.code);
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