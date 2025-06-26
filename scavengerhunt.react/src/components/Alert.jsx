import React, { useEffect, useMemo } from 'react';
import { Container, Notification } from '@mantine/core';
import { IconAlertSquareRounded, IconInfoSquareRounded, IconCheck, IconX } from '@tabler/icons-react';

import { useAlert, useAlertDispatch } from '../utils/AlertContext';

export default function Alert() {
  const alert = useAlert();
  const alertDispatch = useAlertDispatch();

  const getColor = useMemo(() => {
    switch (alert.type) {
      case 'information': return 'blue';
      case 'error': return 'red';
      case 'success': return 'teal';
      case 'warning': return 'yellow';
      default: return 'black';
    }
  }, [alert.type]);

  const getIcon = useMemo(() => {
    switch (alert.type) {
      case 'information': return <IconInfoSquareRounded size={20} />;
      case 'error': return <IconX size={20} />;
      case 'success': return <IconCheck size={20} />;
      case 'warning': return <IconAlertSquareRounded size={20} />;
      default: return <IconInfoSquareRounded size={20} />;
    }
  }, [alert.type]);

  useEffect(() => {
    if (alert.show) 
      setTimeout(() => alertDispatch({ show: false }), 3000); // hide notfiation after 3 seconds
  }, [alert.show]);

  return (
    <>
      {alert.show && (
        <Container fluid style={{ position: 'fixed', top: 25, left: 0, width: '100%', zIndex: 1000 }}>
          <Notification icon={getIcon} color={getColor} title={alert.type} onClose={() => alertDispatch({ show: false })}>
            {alert.message}
          </Notification>
        </Container>
      )}
    </>
  );
}