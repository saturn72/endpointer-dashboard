import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { UserResources } from '@/app/api/datasource/models';

import { config } from '@/config';
import { paths } from '@/paths';
import { DatasourceCreateForm } from '@/components/dashboard/datasource/datasource-create-form';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const metadata = { title: `Create | Datasources | ${config.site.name}` } satisfies Metadata;


export const getServerSideProps = (async () => {
  const res = await fetch('/api/datasource')
  const data: UserResources = await res.json();
  console.log("log", data);
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: UserResources }>

export default function Page({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.JSX.Element {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.datasources.list}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Datasources
            </Link>
          </div>
          <div>
            <Typography variant="h4">Create Datasource</Typography>
          </div>
        </Stack>
        <DatasourceCreateForm />
      </Stack>
    </Box>
  );
}
