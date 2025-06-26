import React from 'react';
import { useParams } from 'react-router';

import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt } from '../services/huntService';
import DashboardActiveHunt from '../components/dashboard/DashboardActiveHunt';

export default function DashboardHuntPage() {
  const [hunt, setHunt] = React.useState(null);
  
  const alertDispatch = useAlertDispatch();
  const params = useParams();

  async function fetchHunt() {
    try {
      const hunt = await getHunt(params.huntid);
      setHunt(hunt);
    } catch (error) {
      console.error('Error fetching hunt:', error);
      alertDispatch({ type: 'error', message: error.message || 'Failed to fetch hunt', show: true });
    }
  }

  React.useEffect(() => { fetchHunt(); }, []);

  React.useEffect(() => {
    if (hunt?.status !== 'Ended') {
      const interval = setInterval(() => fetchHunt(), 5000);
      return () => clearInterval(interval);
    }
  }, [hunt?.status]);

  return (
    <>
      {hunt?.status === 'Not Started' && <>Hunt has not started! QR Code</>}
      {hunt?.status === 'Started' && <DashboardActiveHunt hunt={hunt} />}
      {hunt?.status === 'Ended' && <>Hunt has ended! Player rankings</>}
    </>
  )
};
