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
import { UserResources } from '@/app/api/datasource/models';
import { nameValidator } from './validators';
import { simpleFetch } from '@/core/backend-fetch';

type FormType = {
  name?: string,
  alias?: string,
  tags?: string[]
};


export function DatasourceDetails() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getAuth()
      .currentUser?.getIdToken()
      .then((t: string | undefined) => {
        setToken(t as string);
      });

    simpleFetch('/api/datasource')
      .then((d: UserResources) => setData(d));

    setLoading(false);
  }, []);

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
    removeErrorByKey('name');

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
