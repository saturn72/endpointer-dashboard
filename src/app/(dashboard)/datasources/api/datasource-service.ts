import { unstable_cache } from 'next/cache';
import { adapter } from '@/core/db-adapter';

import { Datasource } from './models';

const acquireUsersDatasources = async (userId: string, limit: number = 25, skip: number = 0): Promise<Datasource[]> => {
  const ds = await adapter.datasource.findMany({
    where: {
      createdByUserId: userId,
    },
    skip: skip,
    take: limit,
  });

  return ds.map((d) => ({
    id: d.id,
    name: d.name,
    alias: d.alias ?? undefined,
    tags: d.tags ?? undefined,
    userId: d.createdByUserId,
  })) satisfies Datasource[];
};

const acquireDatasourceByPath = async (path: string): Promise<Datasource | null> => {
  const d = await adapter.datasource.findUnique({
    where: {
      path,
    },
  });

  if (!d) {
    return null;
  }

  return {
    id: d.id,
    name: d.name,
    alias: d.alias ?? undefined,
    tags: d.tags ?? undefined,
    userId: d.createdByUserId,
  } satisfies Datasource;
};

const buildPath = (userId: string, name: string) => {
  return `/${userId}/${name}`;
};

export async function getDatasourceByPath(userId: string, name: string): Promise<Datasource | null> {
  const path = buildPath(userId, name);
  const keyParts = [`datasource_user-id:${userId}`, `datasource_path:${path}`];
  const tags = ['datasource', `user-id:${userId}`];

  return unstable_cache(async () => acquireDatasourceByPath(path), keyParts, {
    tags,
  })();
}
export async function getUserDatasources(userId: string, limit: number = 25, skip: number = 0): Promise<Datasource[]> {
  const keyParts = [`datasource_user-id:${userId}`, `datasource_user-id:${userId}_limit:${limit}_skip:${skip}`];
  const tags = ['datasource', `user-id:${userId}`];

  return unstable_cache(async () => acquireUsersDatasources(userId, limit, skip), keyParts, {
    tags,
  })();
}
