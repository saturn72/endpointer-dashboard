import * as React from 'react';
import { Stack } from '@mui/material';

import { FileDropzone } from '@/components/core/file-dropzone';

export function DatasourceFileConnection({ onUploaded }: { onUploaded: (files: File[]) => void }): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <FileDropzone
        accept={{
          'application/json': [],
          'application/xml': ['.xml'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
          'text/csv': [],
        }}
        caption="(JSON, XML, XLSX or CSV maximum 10 megabytes)"
        maxFiles={1}
        onDrop={onUploaded}
      />
    </Stack>
  );
}
