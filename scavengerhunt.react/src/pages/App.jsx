import { useNavigate } from 'react-router';
import {
  Button,
  Card,
  Center,
  Image,
  Text
} from '@mantine/core';

import logo from '../assets/images/main-logo.png';

export default function App() {
  const navigate = useNavigate();

  return (
    <>
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
        <Button mb={5} onClick={() => navigate('/hunt/join')} fullWidth>Join Hunt</Button>
        <Button mb={5} onClick={() => navigate('/admin/hunts')} fullWidth>Create Hunt</Button>
      </Card.Section>
    </>
  );
}