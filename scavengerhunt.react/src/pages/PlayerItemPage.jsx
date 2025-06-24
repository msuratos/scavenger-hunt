import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { Center, FileInput, Title, Button, Box, ActionIcon } from '@mantine/core';
import { IconCamera, IconArrowLeft } from '@tabler/icons-react';

import { useAlertDispatch } from '../utils/AlertContext';
import { uploadItemPicture } from '../services/playerService';

export default function PlayerItemPage() {
  const { huntid, itemid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const alertDispatch = useAlertDispatch();

  const [itemPic, setItemPic] = React.useState(null);

  async function handleFileChange(file) {
    setItemPic(file);

    console.debug('File changed:', file, huntid, itemid);

    try {
      await uploadItemPicture(file, huntid, itemid);
      
      alertDispatch({ type: 'success', message: 'Item picture uploaded successfully!', show: true });
      navigate(-1);
    }
    catch (err) {
      console.error('Failed to upload item picture:', err);
      alertDispatch({ type: 'error', message: 'Failed to upload item picture. Please try again.', show: true });
    }
  }

  return (
    <Box pos="relative">
      <ActionIcon
        aria-label="Back"
        c='forest.8'
        size="sm"
        variant="subtle"
        onClick={() => navigate(-1)}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <IconArrowLeft />
      </ActionIcon>
      <Center>
        <Title order={1} c='forest'>{searchParams.get('name')}</Title>
      </Center>
      <FileInput label="Item Picture" leftSection={<IconCamera />} value={itemPic} onChange={handleFileChange} clearable withAsterisk />
    </Box>
  );
}