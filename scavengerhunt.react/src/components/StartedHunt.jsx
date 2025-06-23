import React from 'react';
import { AppShell, Center, FileInput, Grid, List, Loader, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCamera, IconCircleCheck, IconCircleDashed, IconHelpCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { getItemsForPlayer, getPlayer } from '../services/playerService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function StartedHunt(props) {
  const { hunt } = props;

  const [items, setItems] = React.useState([]);
  const [playerName, setPlayerName] = React.useState('');

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getItemsForHunt() {
      try {
        const items = await getItemsForPlayer(hunt.huntId);
        if (items) {
          setItems(items);
        } else {
          alertDispatch({ type: 'warning', message: 'No items available for you at the moment.', show: true });
        }
      } catch (err) {
        console.error('Failed to get items for player', err);
        alertDispatch({ type: 'error', message: err.message, show: true });
      }
    }

    async function getPlayerDetails() {
      try {
        const playerDetails = await getPlayer(hunt.huntId);
        setPlayerName(playerDetails.name);
      } catch (err) {
        console.error('Not a valid player', err);
        navigate('/hunt/join');
        alertDispatch({ type: 'error', message: err.message, show: true });
      }
    }

    getPlayerDetails();
    getItemsForHunt();
  }, []);

  function getItemStatusIcon(status) {
    switch (status) {
      case 'Not Started':
        return (
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed size={16} />
          </ThemeIcon>
        );
      case 'Correct':
        return (
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
        </ThemeIcon>
        );
      default:
        return (
          <ThemeIcon color="red" size={24} radius="xl">
            <IconHelpCircle size={16} />
          </ThemeIcon>
        );
    }
  }

  return (
    <>
      <AppShell>
        <AppShell.Header bg='beige.1'>
          <Grid p={5}>
            <Grid.Col span={6}>
              <Text c='forest' fw={500}>{hunt.title}</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ textAlign: 'right' }}>
              <Text c='forest' fw={500}>{playerName}</Text>
            </Grid.Col>
          </Grid>
        </AppShell.Header>
      </AppShell>

      <Center>
        {items.length === 0
          ? (
            <Stack>
              <Text c='forest'>Getting items...</Text>

              <Center>
                <Loader />
              </Center>
            </Stack>
          )
          : (
            <List spacing="xs" size="sm" center>
              {items.map((item) => (
                <List.Item key={item.itemId} icon={getItemStatusIcon(item.status)}>
                  <Text c='forest' fw={500} td={item.status === 'Correct' ? 'line-through' : undefined}>{item.name}</Text>
                </List.Item>
              ))}
            </List>
          )
        }
      </Center>
    </>
  );
}