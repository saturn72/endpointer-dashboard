import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { DatasourceById } from '@/components/dashboard/datasource/datasource-by-id';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';

// import router from 'next/navigation';

export const metadata = { title: `Datasources | ${config.site.name}` } satisfies Metadata;

export default async function Page({ params }: { params: { datasourceId: string } }) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Datasource Details</Typography>
      </div>

      <Grid spacing={3}>
        <h1>{params.datasourceId}</h1>
        {/* <DatasourceById id={ router.useRoute .id as string}/> */}
      </Grid>
    </Stack>
  );
}
