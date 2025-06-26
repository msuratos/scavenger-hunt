import React from 'react';
import { Card, Group, Text, Avatar, Stack, Title, Divider, Image, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import '@mantine/carousel/styles.css';

// Dummy data for demonstration
const players = [
  { id: 1, name: 'Alice', avatar: '', completed: 12 },
  { id: 2, name: 'Bob', avatar: '', completed: 10 },
  { id: 3, name: 'Charlie', avatar: '', completed: 8 },
];

const itemImages = [
  { id: 1, url: 'https://picsum.photos/400/300', player: 'Alice', item: 'Red Ball' },
  { id: 2, url: 'https://picsum.photos/400/300', player: 'Bob', item: 'Blue Hat' },
  { id: 3, url: 'https://picsum.photos/400/300', player: 'Charlie', item: 'Green Leaf' },
];

export default function DashboardHuntPage() {
  // In a real app, fetch player rankings and images from API

  return (
    <Group align="flex-start" spacing="xl">
      {/* Left: Player Rankings */}
      <Card shadow="sm" miw={320} flex='0 0 350px' bg='var(--mantine-color-darkorange-1)'>
        <Title order={3} c='forest' mb="md">Player Rankings</Title>
        <Divider mb="sm" />
        <Stack>
          {players
            .sort((a, b) => b.completed - a.completed)
            .map((player, idx) => (
              <Group key={player.id} spacing="md">
                <Text weight={700} style={{ width: 24 }}>{idx + 1}</Text>
                <Avatar src={player.avatar} radius="xl">{player.name[0]}</Avatar>
                <Box>
                  <Text>{player.name}</Text>
                  <Text size="xs" c="dimmed">{player.completed} items</Text>
                </Box>
              </Group>
            ))}
        </Stack>
      </Card>

      {/* Right: Carousel of Item Images */}
      <Card shadow="sm" flex={1} miw={0} bg='var(--mantine-color-darkorange-1)'>
        <Title order={3} c='forest' mb="md">Recent Item Uploads</Title>
        <Divider mb="sm" />
        <Carousel 
          slideGap='xl'
          slideSize="90%"
          emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'center'
          }}
        >
          {itemImages.map((img) => (
            <Carousel.Slide key={img.id}>
              <Image src={img.url} alt={img.item} radius="md" h='75vh' fit="cover" />
              <Group>
                <Text weight={500}>{img.item}</Text>
                <Text c="dimmed">by {img.player}</Text>
              </Group>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card>
    </Group>
  );
};
