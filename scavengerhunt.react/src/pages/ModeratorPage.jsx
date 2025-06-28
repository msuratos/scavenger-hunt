import React, { useEffect, useState } from "react";
import { Button, Card, Center, Image, Group, Text, Title, Loader } from "@mantine/core";

import { getNextPendingImage, submitReview } from "../services/moderatorService";
import { getHunt } from "../services/huntService";
import { useAlertDispatch } from "../utils/AlertContext";
import { useParams } from "react-router";

const ModeratorPage = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [huntStatus, setHuntStatus] = useState('');

  const params = useParams();
  const alertDispatch = useAlertDispatch();

  async function fetchNextItem() {
    setLoading(true);

    try {
      const playerItem = await getNextPendingImage();
      setItem(playerItem);
    } catch (err) {
      alertDispatch({ type: "error", message: "Failed to fetch next item.", show: true });
      setItem(null);
    }

    setLoading(false);
  };

  async function handleAction(approved) {
    if (!item) return;
    setActionLoading(true);

    try {
      await submitReview({ itemId: item.itemId, playerId: item.playerId, approved: approved });
      alertDispatch({ type: "success", message: `Item approved successfully!`, show: true });
    } catch (err) {
      alertDispatch({ type: "error", message: "Failed to submit review.", show: true });
    }

    await fetchNextItem(); // no mwatter what, we fetch the next item after action    
    setActionLoading(false);
  };

  useEffect(() => {
    fetchNextItem();
  }, []);

  useEffect(() => {
    async function fetchHunt() {
      const hunt = await getHunt(params.huntid);
      if (hunt.status === 'Ended') {
        setHuntStatus('Ended');
      }
    }

    if (huntStatus !== 'Ended') {
      const interval = setInterval(fetchHunt, 2000);
      return () => clearInterval(interval);
    }
  }, [huntStatus]);

  React.useEffect(() => {
    if (huntStatus !== 'Ended') {
      if (!item) {
        const interval = setInterval(fetchNextItem, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [huntStatus, item]);

  if (huntStatus === 'Ended') {
    return (
      <Center>
        <Text c='forest'>The hunt has ended. No more items to review.</Text>
      </Center>
    );
  }

  if (loading) {
    return <Center><Loader /></Center>;
  }

  if (!item) {
    return <Center><Text c='forest'>No items in the queue.</Text></Center>;
  }

  return (
    <>
      <Card.Section>
        <Center>
          <Title order={5} c='forest'>Player Submission</Title>
        </Center>
        <Image src={`data:image/png;base64,${item.playerImage}`} alt="Player submission" withPlaceholder />
      </Card.Section>

      <Card.Section>
        <Center>
          <Title order={5} c='forest'>Item Reference</Title>
        </Center>
        <Image src={`data:image/png;base64,${item.huntImage}`} alt="Hunt image" withPlaceholder />
      </Card.Section>

      <Text mt="md" fw={500}>Player: {item.playerName}</Text>
      <Text>Item: {item.itemName}</Text>

      <Group mt="md" grow>
        <Button color="forest" loading={actionLoading} onClick={() => handleAction(true)}>
          Approve
        </Button>
        <Button color="darkorange" loading={actionLoading} onClick={() => handleAction(false)}>
          Reject
        </Button>
      </Group>
    </>
  );
};

export default ModeratorPage;
