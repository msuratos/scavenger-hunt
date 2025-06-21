import React from 'react';
import { Center, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';

import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt } from '../services/huntService';
import { isPlayerValid } from '../services/playerService';

export default function HuntPage() {
  const [hunt, setHunt] = React.useState();

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // TODO: verify player
  React.useEffect(() => {
    async function getHuntDetails() {
      try {
        const hunt = await getHunt(params.huntid, undefined);
        setHunt(hunt);
      }
      catch (err) {
        console.error('Failed to get hunt details', err);
        alertDispatch({ type: 'error', message: err, show: true });
      }
    }

    async function getPlayerDetails() {
      try {
        const isValid = await isPlayerValid();
        if (!isValid) throw new Error('You are not a valid player. Please join again');
      }
      catch (err) {
        console.error('Not a valid player', err);
        navigate('/hunt/join');
        alertDispatch({ type: 'error', message: err.message, show: true });
      }
    }

    getHuntDetails();
    getPlayerDetails();
  }, []);

  return (
    <>
      {hunt?.status === 'Not Started' && (
        <>
          <Center>
            <Title order={1}>{hunt.title}</Title>
          </Center>

          <Center>
            <Title order={2}>Not Started</Title>
          </Center>
        </>
      )}

      {hunt?.status === 'Started' && (
        <Title order={1}>{hunt.title} has started</Title>
      )}
    </>
  );
}