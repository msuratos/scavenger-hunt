import React from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Center, FileInput, Title } from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';

export default function PlayerItemPage() {
  const { huntid, itemid } = useParams();
  const [searchParams] = useSearchParams();

  const [itemPic, setItemPic] = React.useState(null);

  async function handleFileChange(file) {
    setItemPic(file);

    console.debug('File changed:', file, huntid, itemid);
    // TODO: Handle file upload to server
    // await uploadItemPicture(file, huntid, itemid);
  }

  return (
    <>
     {/* TODO: put a back button to previous page */}
      <Center>
        <Title order={1} c='forest'>{searchParams.get('name')}</Title>
      </Center>
      <FileInput label="Item Picture" leftSection={<IconCamera />} value={itemPic} onChange={handleFileChange} clearable withAsterisk />
    </>
  );
}