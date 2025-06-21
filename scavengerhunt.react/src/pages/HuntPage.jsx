import React from 'react';
import { Title } from '@mantine/core';
import { useParams } from 'react-router';

import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt } from '../services/huntService';

export default function HuntPage() {
  const [hunt, setHunt] = React.useState();

  const params = useParams();
  const alertDispatch = useAlertDispatch();

  // TODO: verify player
  React.useEffect(() => {
    async function getHuntDetails() {
      try {
        const hunt = await getHunt(params.huntid, undefined);
        setHunt(hunt);
      }
      catch (err) {
        console.error('Failed to get hunt details', err);
        alertDispatch({ type: 'error', message: err, show: true });
      }
    }

    getHuntDetails();
  }, []);

  return (
    <>
      {hunt?.status === 'Not Started' && (
        <Title order={1}>{hunt.title} has not started</Title>
      )}

      {hunt?.status === 'Started' && (
        <Title order={1}>{hunt.title} has started</Title>
      )}
    </>
  );
}