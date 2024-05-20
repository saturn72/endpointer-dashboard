import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { DatasourceCreateForm } from '@/components/dashboard/datasource/(createOrEdit)/datasource-create-form';

export const metadata = { title: `Datasource | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Create Datasource</Typography>
      </div>

      <Grid spacing={3}>
        <DatasourceCreateForm />
      </Grid>
    </Stack>
  );
}
