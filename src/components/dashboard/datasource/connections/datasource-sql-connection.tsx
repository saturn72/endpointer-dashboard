import * as React from 'react';
import { Stack } from '@mui/material';
import { FileDropzone } from '@/components/core/file-dropzone';

export function DatasourceSqlConnection(): React.JSX.Element {
    return (  
      <>
      <h1>this i ssql input</h1>
      <Stack spacing={3}>
      <FileDropzone 
        accept= {{ 
          'text/sql':['.sql'],
        }}
        caption= "(SQL maximum 10 megabytes)"
        maxFiles={1}
        />
    </Stack>    
        </>
  );
}
