import { unstable_cache } from 'next/cache';
import { User } from '@/app/security/types';
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

  return ds.map(mapToDatasource);
};

const acquireDatasourceByPath = async (path: string): Promise<Datasource | null> => {
  const d = await adapter.datasource.findUnique({
    where: {
      path,
    },
  });

  return d ? mapToDatasource(d) : null;
};
const mapToDatasource = (d: Record<string, any>): Datasource => {
  return {
    id: d.id,
    alias: d.alias ?? undefined,
    comment: d.comment,
    createdByUserId: d.createdByUserId,
    createdAtUtc: d.createdAt,
    name: d.name,
    path: d.path,
    published: d.published,
    tags: d.tags ?? undefined,
  } satisfies Datasource;
};

const buildPath = (userId: string, name: string) => {
  return `/${userId.toLowerCase()}/${name}`;
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

export async function createDatasource(user: User, datasource: Datasource): Promise<Datasource> {
  const name = datasource.name.toLowerCase();

  const data = {
    ...datasource,
    createdByUserId: user.sub,
    name,
    path: buildPath(user.sub, name),
    published: false,
  } satisfies Datasource;

  const res = await adapter.datasource.create({
    data,
  });

  return res as Datasource;
}
