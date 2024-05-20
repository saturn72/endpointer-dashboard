'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { getAuth } from 'firebase/auth';
import { useFormStatus } from 'react-dom';
import { paths } from '@/paths';
import { AlertDispatchContext } from '@/contexts/app/alert-context';
import { createDatasource } from '../actions';
import { FormInput } from '../form-input';
import texts from '../texts';
import { FormTags } from '../form-tags';
import { preventContextMenu } from '@fullcalendar/core/internal';
import { string } from 'zod';
import { UserResources } from '@/app/api/datasource/models';
import { nameValidator } from './validators';

type FormType = {
  name?: string,
  alias?: string,
  tags?: string[]
};


export const getData = (async (): Promise<UserResources> => {
  const res = await fetch('/api/datasource')
  return await res.json();
});

export function DatasourceDetails() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getData()
      .then((d: UserResources) => setData(d));

    getAuth()
      .currentUser?.getIdToken()
      .then((t: string | undefined) => {
        setToken(t as string);
      });
    setLoading(false);
  }, []);

  // const [state, formAction] = useFormState(createDatasource, initialState);
  const searchParams = useSearchParams();

  const f: FormType = {
    name: searchParams.get('name') ?? '',
    alias: searchParams.get('alias') ?? '',
    tags: Array.from(searchParams.get('tags') ?? ''),
  };
  const [form, setForm] = useState<FormType>(f)
  const [data, setData] = useState<UserResources>({} as UserResources);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTagChange = (tags: string[]) => {
    setForm((prevState) => ({
      ...prevState,
      tags
    }));
  };

  const removeErrorByKey = (key: string): void => {
    setErrors(prev => {
      const c = { ...prev };
      delete c[key];
      return c;
    });
  };


  const onBlurName = () => {
    setErrors({})
    const n = form.name?.trim().toLowerCase();
    const message = nameValidator(
      n!,
      () => data.datasources.map((s) => {
        return s.name;
      }));
    return setErrors(message ? { name: message } : {})
  };



  const handleChange = (key: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  async function processServerResponse(res: Response): Promise<void> {
    // console.log("this is the resssssssss", res)
    // const errors = res.errors;
    // if (errors) {
    //   if (Array.isArray(errors)) {
    //     (errors as ServerMessage[]).forEach(err => setErrors({ [err.key]: err.message }))
    //   }
    //   else {
    //     showAlert({ message: "Failed to create datasource. Please try again later", severity: 'error' });
    //   }
    //   return;
    // }

    // return Response.redirect('/errors/not-authorized');

    if (res.status == 401 || res.status == 403) {
      console.log('this is401/403', paths.notAuthorized);
      useRouter().push(paths.notAuthorized);
    }
    console.log('this is the response', res);
    const body = await res.json();
    console.log('this is the response code', body);
    // if (res.redirected)
    if (!res.ok) {
      if (res.status == 401) {
        return redirect(paths.notAuthorized);
      }
    }
    // const data = await res.json();

    // console.log("this is the res's status", res.status);

    // return { data };
    // console.log("this is res in details", res);

    // console.log("redirect to edit/id", res);
    // throw new Error('Function not implemented.');
  }

  const { dispatch: showAlert } = useContext(AlertDispatchContext);
  const { pending } = useFormStatus();
  const createDatasourceWithArgs = createDatasource.bind(null, token);

  return (
    <form action={createDatasourceWithArgs}>
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">Datasource Details</Typography>
          </div>
          <Stack spacing={3}>
            <FormInput
              label={texts.name.label}
              name={'name'}
              value={form.name || ''}
              error={errors['name']}
              caption={texts.name.caption}
              placeholder={texts.name.placeholder}
              required
              onFocus={() => removeErrorByKey("name")}
              onBlur={onBlurName}
              onChange={val => handleChange('name', val)}
            />
            <FormInput
              label={texts.alias.label}
              name={'alias'}
              value={form.alias || ''}
              error={errors['alias']}
              onFocus={() => removeErrorByKey("alias")}
              caption={texts.alias.caption}
              placeholder={texts.alias.placeholder}
              onChange={val => handleChange('alias', val)}
            />
            <FormTags
              name='tags'
              helperText='Optional.'
              onChange={handleTagChange}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <LoadingButton loading={pending} type="submit" endIcon={<ArrowRightIcon />} variant="contained">
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </form >
  );
}
