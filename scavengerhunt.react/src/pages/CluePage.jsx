import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getClue } from '../services/clueService';
import Clue from '../components/Clue';
import Loading from '../components/Loading';

export default function CluePage() {
  const [clue, setClue] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getClueApi = async () => {
      setClue(await getClue(params.clueid));
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