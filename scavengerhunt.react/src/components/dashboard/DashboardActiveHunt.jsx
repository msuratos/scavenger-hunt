import React from 'react';
import { Card, Group, Text, Avatar, Stack, Title, Divider, Image, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { getPlayerRankings } from '../../services/playerService';
import { getPlayerImage } from '../../services/dashboardService';

import '@mantine/carousel/styles.css';

export default function DashboardActiveHunt(props) {
  const { hunt } = props;

  const [images, setImages] = React.useState([]);
  const [lastFetchedDate, setLastFetchedDate] = React.useState(new Date().toISOString());
  const [players, setPlayers] = React.useState([]);

  const autoplay = React.useRef(Autoplay({ delay: 3000 }));
  const rankingsRef = React.useRef(null);

  async function fetchPlayers() {
    const playerRankings = await getPlayerRankings(hunt.huntId);
    setPlayers(playerRankings);
  }

  async function fetchItemImages(date) {
    const latestImage = await getPlayerImage(hunt.huntId, date);
    if (!latestImage) return;
    setImages((prev) => [latestImage, ...prev]);
    setLastFetchedDate(latestImage.createdDate);
  }

  React.useEffect(() => { fetchPlayers(); fetchItemImages(); }, []);

  React.useEffect(() => {
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const intervalImages = setInterval(() => fetchItemImages(lastFetchedDate), 10000);
    return () => clearInterval(intervalImages);
  }, [lastFetchedDate]);

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

  // TODO: put the hunt name at the top center of the main page
  // This can be done by adding a Title component above the Group
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

        {images.length === 0 && <Text c='dimmed'>No items uploaded yet.</Text>}
        {images.length > 0 && (
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
                <Image src={`data:image/png;base64,${img.itemImage}`} alt={img.item} radius="md" h='75vh' fit="cover" />
                <Group>
                  <Text weight={500}>{img.item}</Text>
                  <Text c="dimmed">by {img.player}</Text>
                </Group>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Card>
    </Group>
  );
}