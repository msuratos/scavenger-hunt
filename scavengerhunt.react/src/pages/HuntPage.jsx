import React from 'react';
import { useParams } from 'react-router';

export default function HuntPage() {
  const params = useParams();

  // TODO: get hunt details and verify player

  return (
    <>
      Hunt: {params.huntid}
    </>
  );
}