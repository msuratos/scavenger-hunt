import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getItem } from '../services/itemService';
import Clue from '../components/Clue';
import Loading from '../components/Loading';

export default function CluePage() {
  const [clue, setClue] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getClueApi = async () => {
      setClue(await getItem(params.clueid));
      setLoading(false);
    };

    getClueApi();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && <Clue {...clue} />}
    </>
  )
}