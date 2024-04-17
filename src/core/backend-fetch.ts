export type ServerMessage = { key: string; message: string; code?: number | string };

export type ErrorInfo = {
  errors?: string | ServerMessage | ServerMessage[];
};

type methodOptions = 'GET' | 'POST' | 'DELETE' | 'PUT';
// let tmp = process.env.NEXT_PUBLIC_API_URL;

// if (!tmp || tmp.trim().length == 0) {
//   throw new Error("Missing env. variable: 'NEXT_PUBLIC_API_URL'");
// }

// while (tmp?.endsWith('/')) {
//   tmp = tmp.substring(0, tmp.length - 1);
// }

// export async function apiFetch<T>(
//   uri: string,
//   method: methodOptions = 'GET',
//   body: any
// ): Promise<{ data: T | any } & ErrorInfo> {
//   let t = uri;
//   while (t?.startsWith('/')) {
//     t = t.substring(1);
//   }
//   const url = `${backendUrl}${t}`;
//   const b = body ? JSON.stringify(body) : undefined;
//   const o = { method: method, body: b };

//   try {
//     const res = await fetch(url, o);

//     if (!res.ok) {
//       console.log('inspect errors, and chek if key errors or general error');
//       throw new Error(res.statusText);
//     }

//     const data = res.json();
//     return { data };
//   } catch (err) {
//     return {
//       data: body,
//       errors: [
//         { key: 'name', message: 'some error related to name1' },
//         { key: 'name', message: 'some error related to name2' },
//         { key: 'alias', message: 'some error related to alias' },
//       ],
//     };
//   }
// }

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
  const o = {
    headers: {
      'Content-type': 'application/json',
    },
    method: method,
    body: b,
  };

  try {
    const res = await fetch(t, o);
    const data = await res.json();

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
