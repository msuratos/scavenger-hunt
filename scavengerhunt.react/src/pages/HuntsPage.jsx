import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Center, Loader, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import GetHunt from '../services/huntService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function HuntPage() {
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const alertDispatch = useAlertDispatch();

  useEffect(() => {
    const getHuntRequest = async () => {
      try {
        setLoading(true);
        setHunts(await GetHunt());
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

  return (
    <>
      {!loading && hunts.length === 0 && <Text size='md'>No hunts created</Text>}

      {loading && <Center mb={5}><Loader /></Center>}

      {
        hunts.map((value) => (
          <React.Fragment key={value.huntId}>
            <Button onClick={() => navigate("/clue/admin/" + value.huntId)} fullWidth>{value.hunt}</Button>
          </React.Fragment>
        ))
      }

      <Button leftSection={<IconPlus size={18} />} fullWidth>Create Hunt</Button>
    </>
  );
}