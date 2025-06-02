import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Center, Text } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

import GetHunt from '../services/huntService';

export default function HuntPage() {
  const [hunts, setHunts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHuntRequest = async () => {
      try {
        setHunts(await GetHunt());
      }
      catch (err) {
        console.error(err);
      }
    };

    getHuntRequest();
  }, []);

  return (
    <Center maw='100vw' h='100vh'>
      <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
        {hunts.length === 0 && <Text size='md'>No hunts created</Text>}

        {
          hunts.map((value) => (
            <React.Fragment key={value.huntId}>
              <Button onClick={() => navigate("/clue/admin/" + value.huntId)} fullWidth>{value.hunt}</Button>
            </React.Fragment>
          ))
        }

        <Button leftSection={<Plus size={18} />} fullWidth>Create Hunt</Button>
      </Card>
    </Center>
  );
}