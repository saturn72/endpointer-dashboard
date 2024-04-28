import { getAuth } from 'firebase/auth';

export type ServerMessage = { key: string; message: string; code?: number | string };

export type ErrorInfo = {
  errors?: string | ServerMessage | ServerMessage[];
};

type methodOptions = 'GET' | 'POST' | 'DELETE' | 'PUT';

export async function apiFetch<T>(
  uri: string,
  method: methodOptions = 'GET',
  body: any
): Promise<{ data: T | any } | ErrorInfo> {
  let t = uri;
  while (t?.startsWith('/')) {
    t = t.substring(1);
  }
  const b = body ? JSON.stringify(body) : undefined;
  const jwt = await getAuth().currentUser?.getIdToken();

  console.log('this is the jwt', jwt);

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
    const data = await res.json();
    console.log('this is the data', data);

    if (!res.ok) {
      return { errors: data.errors };
    }

    return { data };
  } catch (err: any) {
    return {
      errors: err.toString(),
    };
  }
}
