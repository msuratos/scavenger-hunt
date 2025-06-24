import { Center, Title } from '@mantine/core';
import { useOutletContext } from 'react-router';

import StartedHunt from '../components/StartedHunt';

export default function HuntPage() {
  const { hunt } = useOutletContext();

  return (
    <>
      {hunt?.status === 'Not Started' && (
        <>
          <Center>
            <Title order={1}>{hunt.title}</Title>
          </Center>

          <Center>
            <Title order={2}>Not Started</Title>
          </Center>
        </>
      )}

      {hunt?.status === 'Started' && <StartedHunt hunt={hunt} />}
    </>
  );
}