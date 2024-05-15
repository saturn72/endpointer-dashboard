'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';

import * as dal from './dal';

// const createDatasourceSchema = z.object({
//   name: z.string({
//     invalid_type_error: 'Invalid Name',
//   }),
// })

export type CreateEntityContext = {
  isError?: boolean | undefined;
  errors?: { name?: string[] | undefined };
  entityId?: string | undefined;
  entity?: any | undefined;
};

export async function createDatasource(prevState: any, formData: FormData): Promise<CreateEntityContext> {
  const toCreate = {
    name: formData.get('name') as string,
    alias: formData.get('alias') as string,
    comment: formData.get('comment') as string,
  };

  // const validatedFields = createDatasourceSchema.safeParse(toCreate);

  // if (!validatedFields.success) {
  //     return {
  //         isError:true,
  //         errors: validatedFields.error.flatten().fieldErrors,
  //     };
  // }

  const c = await dal.createDatasource(toCreate);
  //const created = await createIn Database();

  revalidatePath(paths.dashboard.datasources.list);
  const r = paths.dashboard.datasources.details(c.id);
  redirect(r);
}
