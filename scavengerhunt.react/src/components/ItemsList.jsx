import { Card, Center } from "@mantine/core";
// import QRCode from 'qrcode-react';

import Item from './Item';
import Loading from "./Loading";
// import GetQrUrl from '../config/qrUrlConfig';

export default function ItemsList(props) {
  const { items, loading } = props;

  return (
    <>
      {
        items.map((item) => (
          <Card key={item.itemId}>
            <Card.Section style={{ textAlign: 'center' }}>
              <Item {...item}></Item>
              {/* <QRCode value={GetQrUrl() + "/admin/item/" + value.itemId} level={"H"} includeMargin={true} /> */}
            </Card.Section>
          </Card>
        ))
      }
      {loading && <Center><Loading customStyles={{position: 'relative'}} /></Center>}
    </>
  )
};