import React from 'react';
import { Outlet } from 'react-router';
import { AppShell, Group, Image, Title } from '@mantine/core';

import logo from "../../assets/images/main-logo.png"; // Update the path if your logo is elsewhere

export default function Layout() {
  return (
    <AppShell
      padding="md"
      header={{ height: 80 }}
    >
      <AppShell.Header bg='beige.2'>
        <Group px="xs" h="100%">
          <Image src={logo} alt="App Logo" w={80} px='xs' />
          <Title order={2} c="forest.8">Scavenger Hunt</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}