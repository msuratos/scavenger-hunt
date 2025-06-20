import React from 'react';
import { Button, TextInput } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';

export default function JoinHuntPage() {
  const [code, setCode] = React.useState('');
  const [codeExists, setCodeExists] = React.useState(false);
  const [playerName, setPlayerName] = React.useState('');

  const navigate  = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    if (params.code) setCode(params.code);
    setCodeExists(params.code !== undefined && params.code !== '');
  }, [params.code]);

  return (
    <>
      {!codeExists && (
        <>
          <TextInput label="Hunt Code" placeholder="Enter hunt code" value={code} onChange={e => setCode(e.currentTarget.value)} withAsterisk />
          <Button onClick={() => navigate(`/hunt/join/${code}`)}>Join Hunt</Button>
        </>
      )}

      {codeExists && (
        <>
          <TextInput label="Player Name" placeholder="Enter name" value={playerName} onChange={e => setPlayerName(e.currentTarget.value.trim())} withAsterisk />
          <Button disabled={playerName.trim() === ''}>Submit</Button>
        </>
      )}
    </>
  )
}