import React, { useEffect, useState } from "react";
import { Button, Card, Center, Image, Group, Text, Title, Loader } from "@mantine/core";

import { getNextPendingImage, submitReview } from "../services/moderatorService";
import { useAlertDispatch } from "../utils/AlertContext";

const ModeratorPage = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
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
      fetchNextItem();
    } catch (err) {
      alertDispatch({ type: "error", message: "Failed to submit review.", show: true });
    }

    setActionLoading(false);
  };

  useEffect(() => {
    fetchNextItem();
  }, []);

  if (loading) {
    return <Center><Loader /></Center>;
  }

  if (!item) {
    return <Center><Text>No items in the queue.</Text></Center>;
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
        <Button color="green" loading={actionLoading} onClick={() => handleAction(true)}>
          Approve
        </Button>
        <Button color="red" loading={actionLoading} onClick={() => handleAction(false)}>
          Reject
        </Button>
      </Group>
    </>
  );
};

export default ModeratorPage;
