import { useEffect, useState } from 'react';
import { getClue } from '../services/clueService';
import Clue from '../components/clue';

const CluePage = (props) => {
  const [clue, setClue] = useState({});

  useEffect(() => {
    const getClueApi = async () => {
      const { params } = props.match;
      setClue(await getClue(params.clueid));
    };

    getClueApi();
  }, []);

  return (
      <Clue {...clue} />
  )
}

export default CluePage;