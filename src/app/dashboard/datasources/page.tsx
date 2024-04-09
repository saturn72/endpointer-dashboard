import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DatasourceModal } from '@/components/dashboard/datasource/datasource-modal';
import type { Filters } from '@/components/dashboard/datasource/datasources-filters';
import { DatasourcesFilters } from '@/components/dashboard/datasource/datasources-filters';
import { DatasourcesPagination } from '@/components/dashboard/datasource/datasources-pagination';
import { DatasourcesTable } from '@/components/dashboard/datasource/datasources-table';
import type { Datasource } from '@/components/dashboard/datasource/datasources-table';

export const metadata = { title: `Datasources | ${config.site.name}` } satisfies Metadata;

const datasources = [] satisfies Datasource[];

interface PageProps {
  searchParams: { category?: string; previewId?: string; sortDir?: 'asc' | 'desc'; sku?: string; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const { category, previewId, sortDir, sku, status } = searchParams;

  const orderedDatasources = applySort(datasources, sortDir);
  const filteredDatasources = applyFilters(orderedDatasources, { category, sku, status });

  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Datasources</Typography>
            </Box>
            <div>
              <Button
                component={RouterLink}
                href={paths.dashboard.datasources.create}
                startIcon={<PlusIcon />}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <Card>
            <DatasourcesFilters filters={{ category, sku, status }} sortDir={sortDir} />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <DatasourcesTable rows={filteredDatasources} />
            </Box>
            <Divider />
            <DatasourcesPagination count={filteredDatasources.length} page={0} />
          </Card>
        </Stack>
      </Box>
      <DatasourceModal open={Boolean(previewId)} />
    </React.Fragment>
  );
}

// Sorting and filtering has to be done on the server.

function applySort(row: Datasource[], sortDir: 'asc' | 'desc' | undefined): Datasource[] {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row: Datasource[], { category, status, sku }: Filters): Datasource[] {
  return row.filter((item) => {
    if (category) {
      if (item.category !== category) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    if (sku) {
      if (!item.sku?.toLowerCase().includes(sku.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}
