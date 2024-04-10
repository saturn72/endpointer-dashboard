'use client'

import * as React from 'react';
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
import { apiFetch } from '@/components/core/backend-fetch';
import { useSearchParams } from 'next/navigation';
import { DatasourceModel } from './models/DatasourceModel';
import { FormInput } from './form-input';

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


export function DatasourceDetails(): React.JSX.Element {

  const searchParams = useSearchParams();
  const f = {
    name: searchParams.get("name") ?? '',
    alias: searchParams.get("alias") ?? '',
    tags: searchParams.get("tags") ?? ''
  };
  const [form, setForm] = React.useState<{ [key: string]: string }>(f);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tagValue, setTagValue] = React.useState<string>('');
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  function FormInputWithValue({ name }: { name: string }): React.JSX.Element {
    return (<FormInput name={name} value={form[name]} error={errors[name]} caption={captions[name]} onChange={handleChange} />)
  }

  const s: Set<string> = f.tags.trim().length > 0 ? new Set(f.tags.split(',')) : new Set();
  const [tags, setTags] = React.useState<Set<string>>(s);

  const handleChange = (e: { target: { name: any; value: any; }; }) =>

    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleTagAdd = React.useCallback(() => {
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

  const handleTagDelete = React.useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);
      return copy;
    });
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setErrors(() => ({}));
    setLoading(true);
    const res = await apiFetch<DatasourceModel>('datasource', 'POST', form);
    setLoading(false);

    if (!res.errors) {
      console.log("redirect to edit/id");
    }
    else {
      if (Array.isArray(res.errors)) {
        res.errors.forEach(a => setErrors(prev => ({
          ...prev,
          [a.key]: a.message
        })));
        return;
      }

      


      console.log("add to route and add error message");
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">Datasource Details</Typography>
          </div>
          <Stack spacing={3}>
            <FormInputWithValue name="name" />
            <FormInputWithValue name="alias" />
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
          <LoadingButton loading={loading} type='submit' endIcon={<ArrowRightIcon />} variant="contained">
            Next
          </LoadingButton>
        </Stack>
      </Stack>
    </form >
  );
}
