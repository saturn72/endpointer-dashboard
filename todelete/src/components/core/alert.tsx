'use client';

import { Alert, AlertColor, AlertTitle } from '@mui/material';

export default function ({
  severity,
  title,
  message,
}: {
  title?: string | undefined;
  severity: AlertColor;
  message: string;
}) {
  return (
    <Alert severity={severity}>
      {title && <AlertTitle> {title}</AlertTitle>}
      {message}
    </Alert>
  );
}
