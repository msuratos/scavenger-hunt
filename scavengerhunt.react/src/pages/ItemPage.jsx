import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getItem } from '../services/itemService';
import Item from '../components/Item';
import Loading from '../components/Loading';

export default function ItemPage() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getClueApi = async () => {
      setItem(await getItem(params.itemid));
      setLoading(false);
    };

    getClueApi();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && <Item {...item} />}
    </>
  )
}