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
            <Title order={1} c='forest' ta='center'>Hunt Not Started</Title>
          </Center>

          <Center>
            <Title order={5} c='forest' ta='center'>{hunt.title}</Title>
          </Center>
        </>
      )}

      {hunt?.status === 'Started' && <StartedHunt hunt={hunt} />}

      {hunt?.status === 'Ended' && (
        <>
          <Center>
            <Title order={1} c='forest' ta='center'>Hunt Has Ended!</Title>
          </Center>

          <Center>
            <Title order={2} c='forest' ta='center'>Thanks for playing!</Title>
          </Center>

          <Center>
            <Title order={5} c='forest' ta='center'>{hunt.title}</Title>
          </Center>
        </>
      )}
    </>
  );
}