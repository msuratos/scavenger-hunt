export default function Clue (props) {
  const { clue, clueId, image } = props;

  return (
    <div key={clueId} style={{paddingTop: '.5rem', textAlign: 'center'}}>
      <div>{clue}</div>
      {
        image ? <img src={image} style={{height: 'auto', padding: '.5rem .1rem', width: '75%'}} /> : <></>
      }
    </div>
  );
}