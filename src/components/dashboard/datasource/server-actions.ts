"use server"

import { revalidatePath } from 'next/cache';
import paths from './paths';
import { z } from 'zod'
import { redirect } from 'next/navigation';

const createDatasourceSchema = z.object({
  name: z.string({
    invalid_type_error: 'Invalid Name',
  }),
})

export type CreateEntityContext = { 
    isError?:boolean| undefined;
    errors?: {name?: string[] | undefined};
    entityId?: string| undefined;
    entity?:any | undefined;
};

export async function createDatasource(prevState: any, formData:FormData): Promise<CreateEntityContext> {
    const toCreate = {
      name: formData.get('name'),
      alias: formData.get('alias'),
    };
    const validatedFields = createDatasourceSchema.safeParse(toCreate);

    if (!validatedFields.success) {
        return {
            isError:true,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    //const created = await createIn Database();
    revalidatePath(paths.datasources);
    redirect(`${paths.datasources}/123`);
  }
