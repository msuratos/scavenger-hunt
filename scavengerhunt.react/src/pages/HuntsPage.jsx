import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Center, Loader, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import EditHunt from '../components/EditHunt';
import { createHunt, getHunt } from '../services/huntService';
import { useAlertDispatch } from '../utils/AlertContext';
import { createItem } from '../services/itemService';

export default function HuntPage() {
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getHuntRequest = async () => {
      try {
        setLoading(true);
        setHunts(await getHunt());
        alertDispatch({ type: 'success', message: 'Get hunts successful!', show: true });
      }
      catch (err) {
        console.error(`Get hunts failed`, err);
        alertDispatch({ type: 'error', message: 'Failed to get hunts', show: true });
      }

      setLoading(false);
    };

    getHuntRequest();
  }, []);

  async function onEditHuntChange(values) {
    try {
      const hunt = await createHunt(values);

      // create items for hunt
      for (const item of values.items) {
        await createItem(hunt.huntId, { name: item.name });
      }

      alertDispatch({ type: 'success', message: 'Successfully created hunt!', show: true });
      setHunts(await getHunt());
    }
    catch (err) {
      console.error(`Create hunt failed`, err);
      alertDispatch({ type: 'error', message: 'Failed to create hunt', show: true });
    }

    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Hunt" centered>
        <EditHunt onChange={onEditHuntChange} />
      </Modal>

      {!loading && hunts.length === 0 && <Text size='md'>No hunts created</Text>}

      {loading && <Center mb={5}><Loader /></Center>}

      {
        hunts.map((value) => (
          <React.Fragment key={value.huntId}>
            <Button variant='subtle' onClick={() => navigate("/item/admin/" + value.huntId)} fullWidth>{value.title}</Button>
          </React.Fragment>
        ))
      }

      <Button leftSection={<IconPlus size={18} />} onClick={open} fullWidth>Create Hunt</Button>
    </>
  );
}