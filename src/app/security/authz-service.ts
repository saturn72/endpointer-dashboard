import { User, UserRole } from '@/app/security/types';
import admin from 'firebase-admin';
import { App, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { getUserRoles } from './user-role-service';

const pathToServiceAccountKey = process.env.SERVICE_ACCOUNT_KEY;
if (!!!pathToServiceAccountKey) {
  new Error("Failed to get env. varaiable: 'SERVICE_ACCOUNT_KEY'");
}

let e: App | null = null;
try {
  e = getApp('firebase-admin');
} catch (err) {}
const app =
  e ??
  admin.initializeApp(
    {
      credential: admin.credential.cert(<string>pathToServiceAccountKey),
    },
    'firebase-admin'
  );

const auth = getAuth(app);

export async function getUser(token: string, checkRevoked: boolean): Promise<User | undefined> {
  if (!token) {
    return undefined;
  }
  const user = await auth.verifyIdToken(token, checkRevoked);
  return user ? (user as User) : undefined;
}

export async function getUserIfInRole(token: string, userRole: UserRole): Promise<User | undefined> {
  const user = await getUser(token, true);
  if (!user) {
    return undefined;
  }

  const roles = await getUserRoles(user.sub);
  return roles.includes(userRole) ? user : undefined;
}
