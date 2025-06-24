import React from 'react';
import { AppShell, Grid, Text } from '@mantine/core';
import { Outlet, useParams } from 'react-router';
import { getPlayer } from '../services/playerService';
import { getHunt } from '../services/huntService';

export default function PlayerLayout() {
  const params = useParams();
  const [hunt, setHunt] = React.useState();
  const [playerName, setPlayerName] = React.useState('');

  React.useEffect(() => {
    async function getHuntDetails() {
      try {
        const hunt = await getHunt(params.huntid, undefined);
        setHunt(hunt);
      } catch (err) {
        console.error('Failed to get hunt details', err);
        // Optionally handle alert here
      }
    }
    async function getPlayerDetails() {
      try {
        const playerDetails = await getPlayer(params.huntid);
        setPlayerName(playerDetails.name);
      } catch (err) {
        console.error('Not a valid player', err);
        // Optionally handle navigation or alert here
      }
    }
    if (params.huntid) {
      getHuntDetails();
      getPlayerDetails();
    }
  }, [params.huntid]);

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
