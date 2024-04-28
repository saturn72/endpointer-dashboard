import { unstable_cache } from 'next/cache';
import { adapter } from '@/core/db-adapter';

const acquireSubjectPermissions = async (sub: string): Promise<string[]> => {
  const up = await adapter.userRoles.findUnique({
    where: {
      sub: sub.toString(),
    },
  });

  if (!up) {
    return [];
  }
  return up?.roles.split(',').map((d) => d.trim());
};

export async function getUserRoles(userId: string): Promise<string[]> {
  const keyParts = [`permission_user-id:${userId}`];
  const tags = ['permission', `user-id:${userId}`];

  return unstable_cache(async () => acquireSubjectPermissions(userId), keyParts, {
    tags,
  })();
}
