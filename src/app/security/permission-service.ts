import { PermissionKey, User } from './types';

export async function isPermitted(user: User, permissionKey: PermissionKey): Promise<boolean> {
  return await Promise.resolve(true);
}
