import { NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUserIfInRole } from '@/app/security/authz-service';
import { isPermitted } from '@/app/security/permission-service';
import { z } from 'zod';

import { paths } from '@/paths';

import { validateForCreate as validateCreateData } from './datasource-create-validator';
import { createDatasource } from './datasource-service';
import { Datasource } from './models';
import { name } from './rules';

const createSchema = z.object({
  name: z
    .string()
    .min(name.minLength, name.minLengthMessage)
    .max(name.maxLength, name.maxLengthMessage)
    .regex(name.startsWithLetter, name.startsWithLetterMessage)
    .regex(name.notEndsWithHyphen, name.notEndsWithHyphenMessage)
    .regex(name.noMoreThanSingleHyphenInARow, name.noMoreThanSingleHyphenInARowMessage),
  alias: z.string().optional(),
  tags: z.string().optional(),
});

export async function GET(req: Request) {
  return Response.json(
    {
      datasources: [
        {
          name: '1234',
        },
        {
          name: 'abcd',
        },
      ],
    },
    { status: 200 }
  );
}
export async function POST(req: Request) {
  // const user = await getUserIfInRole(req, 'registered');

  // redirect('/errors/not-authorized');
  return Response.json(null, { status: 401 });

  //delete after check - START
  //delete after check - END
  // if (!user) {
  //   return Response.json(null, { status: 401 });
  // }
  // const permitted = await isPermitted(user, 'datasource-create');
  // if (!permitted) {
  //   return new Response(null, { status: 403 });
  // }

  // const body = await req.json();
  // const modelState = await createSchema.safeParseAsync(body);
  // if (!modelState.success) {
  //   const errors = modelState.error.errors.map((err) => ({ key: err.path[0], message: err.message }));
  //   return Response.json({ errors }, { status: 404 });
  // }

  // const validation = await validateCreateData({
  //   ...body,
  //   userId: user.sub,
  // });

  // if (!validation.success) {
  //   return Response.json({ errors: validation.statusText }, { status: validation.status });
  // }

  // const data = body satisfies Datasource;
  // const c = await createDatasource(user, data);
  // redirect(`${c.id}`);
}
