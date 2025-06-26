import React from 'react';
import { Card, Group, Title, Text, List, Divider } from '@mantine/core';
import { QRCodeCanvas } from 'qrcode.react';

export default function DashboardWaitHunt(props) {
  const { hunt } = props;

  const steps = [
    "Share this QR code with players.",
    "Players scan the code to join the hunt.",
    "Enter your player name.",
    "Wait for all players to join.",
    "Hunt master will start the hunt when ready.",
    "Once started, players can upload items as they find them.",
    "Click on one of the items.",
    "Press the upload button to upload image of item.",
    "Select the camera button to take a photo or choose an image from your device.",
    "Players can view their progress and rankings in real-time."
  ];

  return (
    <Group align="flex-start" spacing="xl">
      {/* Left: Steps */}
      <Card shadow="sm" miw={320} flex='0 0 500px' bg='var(--mantine-color-darkorange-1)'>
        <Title order={3} mb="md">How to Join & Play</Title>
        <Divider mb="sm" />
        <List spacing="md" size="md" type='ordered'>
          {steps.map((step, idx) => (
            <List.Item key={idx}>
              <Text>{step}</Text>
            </List.Item>
          ))}
        </List>
      </Card>

      {/* Right: QR Code */}
      <Card shadow="sm" flex={1} miw={0} bg='var(--mantine-color-darkorange-1)' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Title order={3} mb="md">Join via QR Code</Title>
        <Divider mb="sm" />
        <QRCodeCanvas value={`https://${window.location.host}/hunt/join/${hunt.code}`} size={256} />
        <Text mt="md" size="sm" c="dimmed" align="center">
          Scan this code to join the hunt
        </Text>
      </Card>
    </Group>
  );
}
