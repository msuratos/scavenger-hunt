import React from 'react';
import { useNavigate } from 'react-router';
import { AppShell, Grid, Text } from '@mantine/core';
import { Outlet, useParams } from 'react-router';

import { useAlertDispatch } from '../utils/AlertContext';
import { getPlayer } from '../services/playerService';
import { getHunt } from '../services/huntService';

export default function PlayerLayout() {
  const params = useParams();
  const [hunt, setHunt] = React.useState();
  const [playerName, setPlayerName] = React.useState('');

  const navigate = useNavigate();
  const alertDispatch = useAlertDispatch();

  async function getHuntDetails() {
    try {
      const hunt = await getHunt(params.huntid, undefined);
      setHunt(hunt);
    } catch (err) {
      console.error('Failed to get hunt details', err);
      alertDispatch({ type: 'error', message: err.message, show: true });
      navigate('/hunt/join', { replace: true });
    }
  }

  React.useEffect(() => {
    async function getPlayerDetails() {
      try {
        const playerDetails = await getPlayer(params.huntid);
        setPlayerName(playerDetails.name);
      } catch (err) {
        console.error('Not a valid player', err);
        alertDispatch({ type: 'error', message: err.message, show: true });
        navigate(`/hunt/join/${hunt.code}`, { replace: true });
      }
    }

    if (params.huntid) {
      getHuntDetails();
      getPlayerDetails();
    }
  }, [params.huntid, hunt]);

  React.useEffect(() => {
    if (!hunt) return;

    if (hunt?.status !== 'Ended') {
      const interval = setInterval(getHuntDetails, 1000);
      return () => clearInterval(interval);
    }
  }, [hunt?.status]);

  return (
    <>
      <AppShell>
        <AppShell.Header bg='beige.1'>
          <Grid p={5}>
            <Grid.Col span={6}>
              <Text c='forest' fw={500}>{hunt?.title}</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ textAlign: 'right' }}>
              <Text c='forest' fw={500}>{playerName}</Text>
            </Grid.Col>
          </Grid>
        </AppShell.Header>
      </AppShell>

      <Outlet context={{ hunt, playerName }} />
    </>
  );
}
