import * as React from 'react';
import { Stack } from '@mui/material';
import { Accept } from 'react-dropzone';
import { DatasourceFileDropZone } from './datasource-file-drop-zone';

export function DatasourceSql({caption, accept}: {caption:string, accept: Accept}): React.JSX.Element {
    return (  
      <>
      <h1>this i ssql input</h1>
      <Stack spacing={3}>
      <DatasourceFileDropZone 
        accept= {{ 
          'text/sql':['.sql'],
        }}
        caption= "(SQL maximum 10 megabytes)"
        />
    </Stack>    
        </>
  );
}
