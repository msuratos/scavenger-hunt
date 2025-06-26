import { Box, Text } from "@mantine/core";

export default function Item (props) {
  const { name, itemId, image } = props;

  return (
    <Box style={{paddingTop: '.5rem', textAlign: 'center'}}>
      <Text c='darkorange' fw={500}>{name}</Text>
      {
        image ? <img src={`data:image/png;base64,${image}`} style={{height: 'auto', padding: '.5rem .1rem', width: '75%'}} /> : <></>
      }
    </Box>
  );
}