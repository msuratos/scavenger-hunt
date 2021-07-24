import { useEffect, useState } from 'react';
import { getClue } from '../services/clueService';
import Clue from '../components/clue';
import Loading from '../components/loading';

const CluePage = (props) => {
  const [clue, setClue] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClueApi = async () => {
      const { params } = props.match;
      setClue(await getClue(params.clueid));
      setLoading(false);
    };

    getClueApi();
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading && <Clue {...clue} /> }
    </>
  )
}

export default CluePage;