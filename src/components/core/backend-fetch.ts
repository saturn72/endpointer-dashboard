type ServerMessage = { key: string; message: string; code: number | string };
type ErrorInfo = {
  errors?: string | ServerMessage | ServerMessage[];
};

let tmp = process.env.NEXT_PUBLIC_API_URL;

if (!tmp || tmp.trim().length == 0) {
  throw new Error("Missing env. variable: 'NEXT_PUBLIC_API_URL'");
}

while (tmp?.endsWith('/')) {
  tmp = tmp.substring(0, tmp.length - 1);
}

const backendUrl = `${tmp}/`;
type methodOptions = 'GET' | 'POST' | 'DELETE' | 'PUT';

export async function apiFetch<T>(
  uri: string,
  method: methodOptions = 'GET',
  body: any
): Promise<{ data: T | any } & ErrorInfo> {
  let t = uri;
  while (t?.startsWith('/')) {
    t = t.substring(1);
  }
  const url = `${backendUrl}${t}`;
  const b = body ? JSON.stringify(body) : undefined;
  const o = { method: method, body: b };

  try {
    const res = await fetch(url, o);

    if (!res.ok) {
      console.log('inspect errors, and chek if key errors or general error');
      throw new Error(res.statusText);
    }

    return { data: res.json() as T };
  } catch (err) {
    return { data: body, errors: 'unknown error' };
  }
}
