import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Center } from '@mantine/core';

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
        {
          hunts.map((value) => (
            <div key={value.huntId}>
              <Button onClick={() => navigate("/clue/admin/" + value.huntId)} fullWidth>{value.hunt}</Button>
            </div>
          ))
        }
      </Card>
    </Center>
  );
}