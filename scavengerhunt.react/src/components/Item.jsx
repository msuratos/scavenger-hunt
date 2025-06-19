export default function Item (props) {
  const { name, itemId, image } = props;

  return (
    <div key={itemId} style={{paddingTop: '.5rem', textAlign: 'center'}}>
      <div>{name}</div>
      {
        image ? <img src={image} style={{height: 'auto', padding: '.5rem .1rem', width: '75%'}} /> : <></>
      }
    </div>
  );
}