import React, { useEffect, useState } from "react";
import { Button, Card, Center, Image, Group, Text, Title, Loader } from "@mantine/core";
import axios from "axios";
import { useAlertDispatch } from "../utils/AlertContext";

const ModeratorPage = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const alertDispatch = useAlertDispatch();

  const fetchNextItem = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint for fetching the next item in the queue
      const res = await axios.get("/api/v1/moderator/next");
      setItem(res.data || null);
    } catch (err) {
      alertDispatch({ type: "error", message: "Failed to fetch next item.", show: true });
      setItem(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNextItem();
  }, []);

  const handleAction = async (approved) => {
    if (!item) return;
    setActionLoading(true);
    try {
      // Replace with your API endpoint for approving/rejecting
      await axios.post(`/api/v1/moderator/review`, {
        playerItemId: item.id,
        approved,
      });
      fetchNextItem();
    } catch (err) {
      alertDispatch({ type: "error", message: "Failed to submit review.", show: true });
    }
    setActionLoading(false);
  };

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
