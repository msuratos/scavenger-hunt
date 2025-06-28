import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Center, Divider, Group, Title } from "@mantine/core";

import ItemsList from '../components/ItemsList';
import { getItems } from '../services/itemService';
import { getHunt, setStatus } from '../services/huntService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function ItemAdminPage() {
  const [items, setItems] = useState([]);
  const [hunt, setHunt] = useState(null);
  const [loading, setLoading] = useState(true);

  const alertDispatch = useAlertDispatch();
  const params = useParams();  

  async function fetchHunt() {
    const hunt = await getHunt(params.huntid);
    setHunt(hunt);
  }

  async function handleAction(action) {
    setLoading(true);

    try {
      await setStatus(params.huntid, action);
      console.log(`Action ${action} performed on hunt ${params.huntid}`);

      alertDispatch({ type: 'success', message: `Hunt status updated to ${action}`, show: true });
      await fetchHunt();
    } catch (err) {
      console.error(`Failed to perform action ${action}:`, err);
      alertDispatch({ type: 'error', message: `Failed to update hunt status: ${err.message}`, show: true });
    }

    setLoading(false);
  }

  useEffect(() => {
    async function getItemsRequest() {
      setItems(await getItems(params.huntid));
      setLoading(false);
    };

    fetchHunt();
    getItemsRequest();
  }, []);

  return (
    <Box style={{ overflowY: 'auto', padding: '20px', transform: items.length > 3 ? 'translateY(50vh)' : 'none' }}>
      <Center>
        <Title order={3} c='forest'>
          {hunt ? `${hunt.title}` : 'Loading Hunt...'}
        </Title>
      </Center>

      <Group mb="md" grow>
        <Button color="forest" disabled={hunt?.status !== 'Not Started'} loading={loading} onClick={() => handleAction('Started')}>Start</Button>
        <Button color="darkorange" disabled={hunt?.status === 'Ended'} loading={loading} onClick={() => handleAction('Ended')}>End</Button>
      </Group>

      <Divider />

      <ItemsList items={items} loading={loading} />
    </Box>
  );
}