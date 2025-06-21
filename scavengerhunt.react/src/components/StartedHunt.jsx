import React from 'react';
import { AppShell, Center, FileInput, Loader, Stack, Text, Title } from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { getItemForPlayer, getPlayer } from '../services/playerService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function StartedHunt(props) {
  const { hunt } = props;

  const [item, setItem] = React.useState(null);
  const [playerName, setPlayerName] = React.useState('');

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  async function getItem() {
    try {
      const item = await getItemForPlayer(hunt.huntId);
      if (item) {
        setItem(item);
        alertDispatch({ type: 'information', message: `You have received: ${item.name}`, show: true });
      } else {
        alertDispatch({ type: 'warning', message: 'No item available for you at the moment.', show: true });
      }
    }
    catch (err) {
      console.error('Failed to get item for player', err);
      alertDispatch({ type: 'error', message: err.message, show: true });
    }
  }

  React.useEffect(() => {
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
    getItem();
  }, []);

  return (
    <>
      <AppShell>
        <AppShell.Header bg='beige.1'>
          <Center>
            <Text c='forest' fw={500}>{playerName}</Text>
          </Center>
        </AppShell.Header>
      </AppShell>

      <Center>
        {item == null
          ? (
            <Stack>
              <Text c='forest'>Getting your next item...</Text>

              <Center>
                <Loader />
              </Center>
            </Stack>
          )
          : (
            <Stack>
              <Center>
                <Title order={1} c='forest'>{item.name}</Title>
              </Center>
              
              <FileInput
                placeholder='Upload an image of the item'
                description='Image of the item'
                accept='image/*'
                leftSection={<IconCamera />}
                onChange={(file) => {
                  if (file) {
                    alertDispatch({ type: 'success', message: 'Image uploaded successfully!', show: true });
                  } else {
                    alertDispatch({ type: 'warning', message: 'No image selected.', show: true });
                  }
                }}
              />
            </Stack>
          )
        }
      </Center>
    </>
  );
}