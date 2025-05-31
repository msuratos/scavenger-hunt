import { Card } from "@mantine/core";
// import QRCode from 'qrcode-react';

import Clue from './clue';
// import GetQrUrl from '../config/qrUrlConfig';
import Loading from "./loading";

const CluesList = (props) => {
  const { clues, loading } = props;

  return (
    <>
      {
        clues.map((value) => (
          <Card key={value.clueId}>
            <CardContent style={{ textAlign: 'center' }}>
              <Clue {...value}></Clue>
              {/* <QRCode value={GetQrUrl() + "/clue/" + value.clueId} level={"H"} includeMargin={true} /> */}
            </CardContent>
          </Card>
        ))
      }
      { loading && <Loading customStyles={{position: 'relative'}} />}
    </>
  )
};

export default CluesList;