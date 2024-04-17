import { adapter } from '@/core/db-adapter';
import { z } from 'zod';

import { name } from '../Consts';
import { validate } from './datasource-create-validator';

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

export async function POST(req: Request) {
  const body = await req.json();

  const modelState = await createSchema.safeParseAsync(body);
  if (!modelState.success) {
    const errors = modelState.error.errors.map((err) => ({ key: err.path[0], message: err.message }));
    return Response.json({ errors }, { status: 404 });
  }

  const validation = await validate(body);
  if (!validation.success) {
    return new Response(null, { status: validation.status, statusText: validation.statusText });
  }

  const data = prepareForCreate(body);
  const c = await adapter.datasource.create({
    data,
  });

  return new Response(JSON.stringify(c));
}
function prepareForCreate<T extends { name: string }>(datasource: T) {
  return {
    ...datasource,
    name: datasource.name.toLowerCase(),
  };
}
function validateForCreate(body: any) {
  //user is permitted
  //name is unique for user
  throw new Error('Function not implemented.');
}
