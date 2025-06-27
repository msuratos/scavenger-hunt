import React from 'react';
import { Card, Group, Text, Avatar, Stack, Title, Divider, Image, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { getPlayerRankings } from '../../services/playerService';

import '@mantine/carousel/styles.css';

const itemImages = [
  { id: 1, url: 'https://picsum.photos/400/300', player: 'Alice', item: 'Red Ball' },
  { id: 2, url: 'https://picsum.photos/400/300', player: 'Bob', item: 'Blue Hat' },
  { id: 3, url: 'https://picsum.photos/400/300', player: 'Charlie', item: 'Green Leaf' },
];

export default function DashboardActiveHunt(props) {
  const { hunt } = props;
  const [players, setPlayers] = React.useState([]);
  const [images, setImages] = React.useState(itemImages);
  const autoplay = React.useRef(Autoplay({ delay: 3000 }));
  const rankingsRef = React.useRef(null);

  async function fetchPlayers() {
    const playerRankings = await getPlayerRankings(hunt.huntId);
    setPlayers(playerRankings);
  }

  React.useEffect(() => { fetchPlayers(); }, []);
  React.useEffect(() => {
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logic
  React.useEffect(() => {
    const rankingsEl = rankingsRef.current;
    if (!rankingsEl) return;
    let direction = 1;
    let scrollStep = 1;
    let interval = null;

    function startScroll() {
      interval = setInterval(() => {
        if (!rankingsEl) return;
        rankingsEl.scrollTop += scrollStep * direction;
        // If reached bottom, reverse direction
        if (rankingsEl.scrollTop + rankingsEl.clientHeight >= rankingsEl.scrollHeight) {
          direction = -1;
        }
        // If reached top, reverse direction
        if (rankingsEl.scrollTop <= 0) {
          direction = 1;
        }
      }, 30);
    }

    // Only autoscroll if overflowed
    if (rankingsEl.scrollHeight > rankingsEl.clientHeight) {
      startScroll();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [players]);

  return (
    <Group align="flex-start" spacing="xl">
      {/* Left: Player Rankings */}
      <Card
        shadow="sm"
        miw={320}
        flex='0 0 350px'
        bg='var(--mantine-color-darkorange-1)'
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
        ref={rankingsRef}
      >
        <Title order={3} c='forest' mb="md">Player Rankings</Title>
        <Divider mb="sm" />
        <Stack>
          {players
            .sort((a, b) => b.completed - a.completed)
            .map((player, idx) => (
              <Group key={player.playerId} spacing="md">
                <Text weight={700} style={{ width: 24 }}>{idx + 1}</Text>
                <Box>
                  <Text>{player.name}</Text>
                  <Text size="xs" c="dimmed">{player.points} points</Text>
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
          plugins={[autoplay.current]}
          emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'center'
          }}
        >
          {images.map((img) => (
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
}