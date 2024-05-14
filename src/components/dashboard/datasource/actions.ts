'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/app/security/authz-service';

import { paths } from '@/paths';

export async function createDatasource(token: string, formData: FormData) {
  const user = await getUser(token, false);
  if (!user) {
    redirect(paths.notAuthorized);
  }

  console.log('this is here');
  redirect(paths.notAuthorized);
  throw new Error("return { ...datasource, id: '123' }");
  //revalidateTag("by user if")
}
