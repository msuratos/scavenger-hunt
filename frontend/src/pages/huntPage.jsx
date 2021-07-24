import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "ui-neumorphism";

import GetHunt from '../services/huntService';

const HuntPage = () => {
  const [hunts, setHunts] = useState([]);

  useEffect(() => {
    const getHuntRequest = async () => {
      try {
        setHunts(await GetHunt());
      }
      catch (err) {
        console.log(err);
      }
   };
   
   getHuntRequest();
  }, []);

  return (
    <div>
    {
      hunts.map((value) => ( 
        <div key={value.huntId}>
          <Button style={{width: '100%'}}>
            <Link to={"/clue/admin/" + value.huntId}>{value.hunt}</Link> 
          </Button>
        </div>
      ))
    }
    </div>
  );
}

export default HuntPage;