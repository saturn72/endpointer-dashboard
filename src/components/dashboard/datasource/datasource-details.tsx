'use client'


import { useFormState, useFormStatus } from 'react-dom'

import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { FormInput } from './form-input';
import { AlertDispatchContext } from '@/contexts/app/alert-context';
import { useContext, useState, useCallback } from 'react';
import { paths } from '@/paths';
import { createDatasource } from './actions';
import { getAuth } from 'firebase/auth';
import { useUser } from '@/hooks/use-user';

const captions: { [key: string]: React.JSX.Element } = {
  name: (<>
    The primary referrar for the datasource<br />
    <strong> Required.</strong>&nbsp;Must be unique for you account. My contains numbers, letters and '-' characters only.
  </>),
  alias: (<>
    Alias/nickname for the datasource<br />
    <strong>Optional.</strong>&nbsp;This value is for your internal usage only (to be used for searches, analytics etc.).
  </>)
} satisfies { [key: string]: React.JSX.Element };

const initialState = {};


export function DatasourceDetails(): React.JSX.Element {

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    getAuth().currentUser?.getIdToken()
      .then((t: string | undefined) => setToken(t as string));
  }, []);



  const [state, formAction] = useFormState(createDatasource, initialState);
  const searchParams = useSearchParams();
  const f = {
    name: searchParams.get("name") ?? '',
    alias: searchParams.get("alias") ?? '',
    tags: searchParams.get("tags") ?? ''
  };
  const [form, setForm] = useState<{ [key: string]: string }>(f);

  const [loading, setLoading] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const s: Set<string> = f.tags.trim().length > 0 ? new Set(f.tags.split(',')) : new Set();
  const [tags, setTags] = useState<Set<string>>(s);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTagAdd = useCallback(() => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      const arr = Array.from(copy);
      setForm((prevState) => ({
        ...prevState,
        tags: arr.join()
      }));
      return copy;
    });

    setTagValue('');
  }, [tagValue]);

  const handleTagDelete = useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);
      return copy;
    });
  }, []);

  // async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
  //   event.preventDefault();
  //   showAlert(undefined);

  //   setErrors(() => ({}));
  //   setLoading(true);
  //   const { uri, init } = await buildApiFetchData('api', 'POST', form);
  //   const res = await fetch(uri, init)
  //   processServerResponse(res);
  //   setLoading(false);
  // }

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
      console.log("this is401/403", paths.notAuthorized)
      useRouter().push(paths.notAuthorized);
    }
    console.log("this is the response", res)
    const body = await res.json();
    console.log("this is the response code", body)
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
    <form action={createDatasourceWithArgs} >
      {/* <form onSubmit={onSubmit} > */}
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">Datasource Details</Typography>
          </div>
          <Stack spacing={3}>
            <FormInput name={'name'} value={form['name']} error={errors['name']} caption={captions['name']} onChange={handleChange} />
            <FormInput name={'alias'} value={form['alias']} error={errors['alias']} caption={captions['alias']} onChange={handleChange} />
            <FormControl>
              <InputLabel>Tags</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <Button color="secondary" onClick={handleTagAdd} size="small" disabled={tagValue.length == 0}>
                      Add
                    </Button>
                  </InputAdornment>
                }
                name="tags"
                onChange={(event) => {
                  setTagValue(event.target.value);
                }}
                value={tagValue}
              />
              <FormHelperText>
                <strong>Optional.</strong>&nbsp;
              </FormHelperText>
            </FormControl>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              {Array.from(tags.values()).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => {
                    handleTagDelete(tag);
                  }}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <LoadingButton loading={pending} type='submit' endIcon={<ArrowRightIcon />} variant="contained">
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </form >
  );
}

