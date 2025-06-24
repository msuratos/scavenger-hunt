import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { Center, FileInput, Title, Button, Box, ActionIcon } from '@mantine/core';
import { IconCamera, IconArrowLeft } from '@tabler/icons-react';

export default function PlayerItemPage() {
  const { huntid, itemid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [itemPic, setItemPic] = React.useState(null);

  async function handleFileChange(file) {
    setItemPic(file);

    console.debug('File changed:', file, huntid, itemid);
    // TODO: Handle file upload to server
    // await uploadItemPicture(file, huntid, itemid);
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