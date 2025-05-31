import {
  Button,
  Card,
  Center,
  Image,
  Text
} from '@mantine/core';

import logo from '../assets/images/main-logo.png';

export default function App() {
  return (
    <Center maw='100vw' h='100vh'>
      <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
        <Card.Section>
          <Image src={logo} alt="Dog" fit="contain" height={100} mt={5} />
        </Card.Section>

        <Center>
          <Text className='title' size="xl">SCAVENGER HUNT</Text>
        </Center>

        <Center>
          <Text className='title'>HUNTING TIME!</Text>
        </Center>

        <Card.Section p={5}>
          <Button mb={5} fullWidth>Join Hunt</Button>
          <Button mb={5} fullWidth>Create Hunt</Button>
        </Card.Section>
      </Card>
    </Center>
  );
}