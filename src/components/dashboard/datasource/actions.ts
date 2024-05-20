'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/app/security/authz-service';

import { paths } from '@/paths';

export async function createDatasource(
  token: string,
  // prevState: {
  //   message: string;
  // },
  formData: FormData
) {
  const user = await getUser(token, false);
  if (!user) {
    redirect(paths.notAuthorized);
  }

  const rawFormData = Object.fromEntries(formData);
  console.log('form-data', rawFormData);
  console.log('this is here');
  throw new Error("return { ...datasource, id: '123' }");
  // redirect(paths.notAuthorized);
  //revalidateTag("by user if")
}
