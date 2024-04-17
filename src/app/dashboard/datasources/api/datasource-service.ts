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
export async function getUserDatasources(userId: string, limit: number = 25, skip: number = 0): Promise<Datasource[]> {
  const keyParts = [`datasource_user-id:${userId}`, `datasource_user-id:${userId}_limit:${limit}_skip:${skip}`];
  const tags = ['datasource', `user-id:${userId}`];

  return unstable_cache(async () => acquireUsersDatasources(userId, limit, skip), keyParts, {
    tags,
  })();
}
