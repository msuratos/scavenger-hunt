import { Outlet } from 'react-router';
import { Card, Center } from '@mantine/core';

export default function Layout() {
  return (
    <Center maw='100vw' h='100vh'>
      <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
        <Outlet />
      </Card>
    </Center>
  );
}