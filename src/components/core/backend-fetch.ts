let tmp = process.env.NEXT_PUBLIC_API_URL;

if (!tmp || tmp.trim().length == 0) {
  throw new Error("Missing env. variable: 'NEXT_PUBLIC_API_URL'");
}

while (tmp?.endsWith('/')) {
  tmp = tmp.substring(0, tmp.length - 1);
}

const backendUrl = `${tmp}/`;
type methodOptions = 'GET' | 'POST' | 'DELETE' | 'PUT';
export async function apiFetch<T>(uri: string, method: methodOptions = 'GET', body: any): Promise<T> {
  let t = uri;
  while (t?.startsWith('/')) {
    t = t.substring(1);
  }
  const url = `${backendUrl}${t}`;
  const b = body ? JSON.stringify(body) : undefined;
  const o = { method: method, body: b };

  const res = await fetch(url, o);

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json() as Promise<T>;
}
