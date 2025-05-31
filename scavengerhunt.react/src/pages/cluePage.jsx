import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Center } from '@mantine/core';

import { getClue } from '../services/clueService';
import Clue from '../components/Clue';
import Loading from '../components/Loading';

export default function CluePage() {
  const [clue, setClue] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getClueApi = async () => {
      setClue(await getClue(params.clueid));
      setLoading(false);
    };

    getClueApi();
  }, []);

  return (
    <Center maw='100vw' h='100vh'>
      <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
        {loading && <Loading />}
        {!loading && <Clue {...clue} />}
      </Card>
    </Center>
  )
}