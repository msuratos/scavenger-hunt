import React from 'react';
import { Box, Center, Divider, Group, Loader, Stack, Text, Title } from '@mantine/core';

import { getPlayerRankings } from '../../services/playerService';

import '@mantine/carousel/styles.css';
import { useAlertDispatch } from '../../utils/AlertContext';

export default function DashboardActiveHunt(props) {
  const { hunt } = props;
  const alertDispatch = useAlertDispatch();

  const [loading, setLoading] = React.useState(false);
  const [players, setPlayers] = React.useState([]);

  /**
   * Fetches player rankings for the current hunt.
   * Updates the players state with the fetched rankings.
   */
  async function fetchPlayers() {
    try {
        setLoading(true);
        const playerRankings = await getPlayerRankings(hunt.huntId);
        setPlayers(playerRankings.slice(0, 10));
        alertDispatch({ type: 'success', message: 'Player rankings fetched successfully', show: true });
    }
    catch (error) {
      console.error('Error fetching player rankings:', error);
      alertDispatch({ type: 'error', message: error.message || 'Failed to fetch player rankings', show: true });
    }
    setLoading(false);
  }

  // Initial fetch for players
  React.useEffect(() => { fetchPlayers(); }, []);

  return (
    <>
      <Center>
        <Title order={2} c='forest'>Hunt has ended!</Title>
      </Center>

      <Center>
        <Title order={3} c='forest'>Player Rankings</Title>
      </Center>

      <Divider mb="sm" />

      {loading && <Loader />}

      {!loading && (
        <Center mt='xl'>
          <Stack>
            {players.map((player, idx) => (
              <Group key={player.playerId} spacing="md">
                <Text weight={700} style={{ width: 24 }}>{idx + 1}</Text>
                <Box>
                  <Text>{player.name}</Text>
                  <Text size="xs" c="dimmed">{player.points} points</Text>
                </Box>
              </Group>
            ))}
          </Stack>
        </Center>
      )}

    </>
  );
}