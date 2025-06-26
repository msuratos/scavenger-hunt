import React from 'react';
import { Button, Card, Center, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { getHunt } from '../services/huntService';
import { useAlertDispatch } from '../utils/AlertContext';

const DashboardJoinPage = () => {
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  async function onJoinClick() {
    try {
      setLoading(true);
      const hunt = await getHunt(undefined, code);
      navigate(`/dashboard/${hunt.huntId}`);
    }
    catch (error) {
      console.error('Error joining hunt:', error);
      setLoading(false);
      alertDispatch({ type: 'error', message: error.message || 'Failed to join hunt', show: true });
    }
  }

  return (
    <Center maw='100vw' h='100vh'>
      <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
        <TextInput label="Hunt Code" placeholder="Enter hunt code" disabled={loading} value={code} onChange={e => setCode(e.currentTarget.value)} withAsterisk />
        <Button loading={loading} onClick={onJoinClick}>Join Hunt</Button>
      </Card>
    </Center>
  );
};

export default DashboardJoinPage;
