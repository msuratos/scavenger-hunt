import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { ActionIcon, Box, Center, FileInput, Loader, RingProgress, Stack, Text, Title } from '@mantine/core';
import { IconCamera, IconArrowLeft } from '@tabler/icons-react';

import { useAlertDispatch } from '../utils/AlertContext';
import { uploadItemPicture } from '../services/playerService';

export default function PlayerItemPage() {
  const { huntid, itemid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const alertDispatch = useAlertDispatch();

  const [itemPic, setItemPic] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  async function handleFileChange(file) {
    setItemPic(file);
    setProgress(0);
    setUploading(true);
    console.debug('File changed:', file, huntid, itemid);

    try {
      await uploadItemPicture(file, huntid, itemid, (percent) => setProgress(percent));
      alertDispatch({ type: 'success', message: 'Item picture uploaded successfully!', show: true });
      setUploading(false);
      navigate(-1);
    }
    catch (err) {
      console.error('Failed to upload item picture:', err);
      alertDispatch({ type: 'error', message: err.message, show: true });
      setUploading(false);
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
        disabled={uploading}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <IconArrowLeft />
      </ActionIcon>

      <Center>
        <Title order={1} c='forest'>{searchParams.get('name')}</Title>
      </Center>

      {uploading && (
        <Center>
          {progress < 100
            ? (<RingProgress
                mb={10}
                label={<Text c='forest' ta="center">{progress}%</Text>}
                sections={[{ value: progress, color: 'forest' }]}
              />
            )
            : (
              <Stack>
                <Center>
                  <Loader color="forest" />
                </Center>

                <Text c='forest' ta="center">Processing...</Text>
              </Stack>
            )
          }
        </Center>
      )}

      {!uploading &&
        <FileInput label="Item Picture" leftSection={<IconCamera />} value={itemPic} onChange={handleFileChange} clearable withAsterisk disabled={uploading} />
      }
    </Box>
  );
}