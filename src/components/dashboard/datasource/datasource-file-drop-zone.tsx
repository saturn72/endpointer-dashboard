import * as React from 'react';
import { FileDropzone } from '@/components/core/file-dropzone';
import { Stack } from '@mui/material';
import { Accept } from 'react-dropzone';

export function DatasourceFileDropZone({caption, accept}: {caption:string, accept: Accept}): React.JSX.Element {
  
  return (  
    <Stack spacing={3}>
      <FileDropzone 
        accept={accept}
        caption={caption}
        maxFiles={1}
        />
    </Stack>    
  );
}
