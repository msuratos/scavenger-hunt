import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Center, FileInput, Group, Loader, Modal, Stepper, Text, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import GetHunt from '../services/huntService';
import { useAlertDispatch } from '../utils/AlertContext';

export default function HuntPage() {
  const [active, setActive] = useState(0);
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    const getHuntRequest = async () => {
      try {
        setLoading(true);
        setHunts(await GetHunt());
        alertDispatch({ type: 'success', message: 'Get hunts successful!', show: true });
      }
      catch (err) {
        console.error(`Get hunts failed`, err);
        alertDispatch({ type: 'error', message: 'Failed to get hunts', show: true });
      }

      setLoading(false);
    };

    getHuntRequest();
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Hunt" centered>
        <Stepper active={active} onStepClick={setActive} size='xs'>
          <Stepper.Step label="First step" description="Create a Hunt">
            <TextInput label="Title" placeholder="Enter a text" withAsterisk />
            <TextInput label="Subtitle" placeholder="Enter a text (optional)" />
            <DateTimePicker label="Start Date" description="Pick a date and time" placeholder="MM/DD/YYYY" withAsterisk />
            <DateTimePicker label="End Date" description="Pick a date and time" placeholder="MM/DD/YYYY" withAsterisk />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Add Items">
            <TextInput label="Item Name" placeholder="Enter a text" withAsterisk />
            <FileInput label="Picture" description="Picture of item" placeholder="Take a picture" withAsterisk />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>Back</Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Modal>

      {!loading && hunts.length === 0 && <Text size='md'>No hunts created</Text>}

      {loading && <Center mb={5}><Loader /></Center>}

      {
        hunts.map((value) => (
          <React.Fragment key={value.huntId}>
            <Button onClick={() => navigate("/clue/admin/" + value.huntId)} fullWidth>{value.hunt}</Button>
          </React.Fragment>
        ))
      }

      <Button leftSection={<IconPlus size={18} />} onClick={open} fullWidth>Create Hunt</Button>

    </>
  );
}