import React, { useMemo } from 'react';
import { Container, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { useAlert } from '../utils/AlertContext';

export default function Alert() {
  const alert = useAlert();

  const getColor = useMemo(() => {
    switch (alert.type) {
      case 'information': return 'blue';
      case 'error': return 'red';
      default: return 'black';
    }
  }, [alert.type]);

  return (
    <>
      {alert.show && (
        <Container fluid style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
          <Notification icon={<IconX size={20} />} color={getColor} title={alert.type}>
            {alert.message}
          </Notification>
        </Container>
      )}
    </>
  );
}