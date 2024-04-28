'use-server';

import { NextRequest, NextResponse } from 'next/server';
import { App, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

import { config } from '@/config';

const c = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
};
const app: App = initializeApp(c);
const auth: Auth = getAuth(app);

export default async function (request: NextRequest) {
  const jwt = request.headers.get('Authorization');
  if (jwt == null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await auth.verifyIdToken(jwt, false);
  console.log('user info:', { user });

  return NextResponse.next();
}
