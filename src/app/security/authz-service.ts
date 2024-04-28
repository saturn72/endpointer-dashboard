import { UserRole } from '@/app/security/types';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import { getUserRoles } from './user-role-service';

export type User = {
  sub: string;
  email: string;
};

const pathToServiceAccountKey = process.env.SERVICE_ACCOUNT_KEY;
if (!!!pathToServiceAccountKey) {
  new Error("Failed to get env. varaiable: 'SERVICE_ACCOUNT_KEY'");
}
const app = admin.initializeApp({
  credential: admin.credential.cert(<string>pathToServiceAccountKey),
});

const auth = getAuth(app);

export async function getUser(req: Request, checkRevoked: boolean): Promise<User | undefined> {
  const authHeader = req.headers.get('Authorization');

  const token = authHeader?.split(' ')[1];
  if (!token) {
    return undefined;
  }
  const user = await auth.verifyIdToken(token, checkRevoked);
  return user ? (user as User) : undefined;
}

export async function getUserIfInRole(req: Request, userRole: UserRole): Promise<User | undefined> {
  const user = await getUser(req, true);
  if (!user) {
    return undefined;
  }

  const permissions = await getUserRoles(user.sub);
  return permissions.includes(userRole) ? user : undefined;
}
