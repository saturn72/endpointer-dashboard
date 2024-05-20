import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';

import { paths } from '@/paths';

export type ServerMessage = { key: string; message: string; code?: number | string };

export type ErrorInfo = {
  errors?: string | ServerMessage | ServerMessage[];
};

type methodOptions = 'GET' | 'POST' | 'DELETE' | 'PUT';

const backendUrl = process.env.BACKEND_URL;

export async function simpleFetch(url: string) {
  const jwt = await getAuth().currentUser?.getIdToken();
  const o = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };

  const res = await fetch(url, o);
  return res.json();
}

export async function apiFetch(
  uri: string,
  method: methodOptions = 'GET',
  body: any | undefined
): Promise<(Response & ErrorInfo) | ErrorInfo> {
  let t = uri;
  while (t?.startsWith('/')) {
    t = t.substring(1);
  }
  const b = body ? JSON.stringify(body) : undefined;
  const jwt = await getAuth().currentUser?.getIdToken();

  const o = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    method: method,
    body: b,
  };

  try {
    const res = await fetch(t, o);

    if (res.status == 401 || res.status == 403) {
      NextResponse.redirect(new URL(paths.notAuthorized));
    }

    return res;
  } catch (err: any) {
    return {
      errors: err.toString(),
    };
  }
}
