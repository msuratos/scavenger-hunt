import React from 'react';
import { Outlet } from 'react-router';
import { AppShell, Group, Image, Text, Title } from '@mantine/core';

import logo from "../../assets/images/main-logo.png"; // Update the path if your logo is elsewhere

export default function Layout() {
  return (
    <AppShell>
      <AppShell.Header bg='beige.2'>
        <Group px="xs" h="100%">
          <Image src={logo} alt="App Logo" w={80} px='xs' />
          <Title order={2} c="forest">Scavenger Hunt</Title>
        </Group>
      </AppShell.Header>
      <Outlet />
    </AppShell>
  );
}