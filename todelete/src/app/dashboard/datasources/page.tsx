import * as React from 'react';
import type { Metadata } from 'next';
import { getDatasources } from '@/services/datasource';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { paths } from '@/paths';
import { DatasourcesFilters } from '@/components/dashboard/datasource/datasources-filters';
import { DatasourcesTable } from '@/components/dashboard/datasource/datasources-table';

export const metadata = { title: `Datasources | ${config.site.name}` } satisfies Metadata;

export default async function Page() {
  const page = 0;
  const rowsPerPage = 5;
  const datasources = await getDatasources(page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Datasources</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button
            href={paths.dashboard.datasources.create}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <DatasourcesFilters />
      <DatasourcesTable count={datasources.length} page={page} rows={datasources} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}
