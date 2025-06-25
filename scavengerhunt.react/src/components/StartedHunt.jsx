import React from 'react';
import { Center, List, Loader, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed, IconCircleX, IconHelpCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

import { getItemsForPlayer } from '../services/playerService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function StartedHunt(props) {
  const { hunt } = props;

  const [items, setItems] = React.useState([]);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getItemsForHunt() {
      try {
        const items = await getItemsForPlayer(hunt.huntId);

        if (items.every((item) => item.status === 'Correct')) setIsCompleted(true);

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
      case 'Pending':
        return (
          <ThemeIcon color="yellow" size={24} radius="xl">
            <IconHelpCircle size={16} />
          </ThemeIcon>
        );
      default:
        return (
          <ThemeIcon color="red" size={24} radius="xl">
            <IconCircleX size={16} />
          </ThemeIcon>
        );
    }
  }

  return (
    <>
      <Center>
        {!isCompleted && (
          items.length === 0
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
                  <List.Item key={item.itemId} icon={getItemStatusIcon(item.status)} onClick={() => navigate(`item/${item.itemId}?name=${item.name}`)}>
                    <Text c='forest' fw={500} td={item.status === 'Correct' ? 'line-through' : undefined}>{item.name}</Text>
                  </List.Item>
                ))}
              </List>
            )
        )}

        {isCompleted && (
          <Stack>
            <Center>
              <Title order={1} c='forest'>Congratulations!</Title>
            </Center>

            <Center>
              <Text c='forest' fw={500}>You have completed the hunt.</Text>
            </Center>
          </Stack>
        )}
      </Center>
    </>
  );
}