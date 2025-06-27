import React from 'react';
import { useParams } from 'react-router';

import DashboardActiveHunt from '../components/dashboard/DashboardActiveHunt';
import DashboardEndHunt from '../components/dashboard/DashboardEndHunt';
import DashboardWaitHunt from '../components/dashboard/DashboardWaitHunt';

import { useAlertDispatch } from '../utils/AlertContext';
import { getHunt } from '../services/huntService';

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
      {hunt?.status === 'Not Started' && <DashboardWaitHunt hunt={hunt} />}
      {hunt?.status === 'Started' && <DashboardActiveHunt hunt={hunt} />}
      {hunt?.status === 'Ended' && <DashboardEndHunt hunt={hunt} />}
    </>
  )
};
