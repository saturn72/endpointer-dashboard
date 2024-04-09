
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

export function DatasourceDetailsStep(): React.JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tagValue, setTagValue] = React.useState<string>('');

  const searchParams = useSearchParams();
  const f = {
    name: searchParams.get("name") ?? '',
    alias: searchParams.get("alias") ?? '',
    tags: searchParams.get("tags") ?? ''
  };

  const [form, setForm] = React.useState<{ name: string, alias: string, tags: string }>(f);

  const s: Set<string> = f.tags.trim().length > 0 ? new Set(f.tags.split(',')) : new Set();
  const [tags, setTags] = React.useState<Set<string>>(s);

  const handleFormChange = (key: 'name' | 'alias' | 'tags', value: string) => {
    setForm((prevState) => {
      const n = { ...prevState };
      n[key] = value;
      return n;
    });
  }

  const handleTagAdd = React.useCallback(() => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      const arr = Array.from(copy);
      handleFormChange('tags', arr.join())
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
    setLoading(true);

    const res = await apiFetch('datasource', 'POST', form);
    console.log("this is thr res", res);
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} >
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">Some information about the datasource</Typography>
          </div>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel>Datasource name</InputLabel>
              <OutlinedInput required
                name="name"
                placeholder="my-greatest-datasource"
                onChange={e => handleFormChange('name', e.target.value)}
                value={form.name}
              />
              <FormHelperText>
                The primary referrar for the datasource<br />
                <strong>Required.</strong>&nbsp;Must be unique for you account. My contains numbers, letters and '-' characters only.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel>Datasource alias</InputLabel>
              <OutlinedInput name="alias" placeholder="store-datasource"
                onChange={e => handleFormChange('alias', e.target.value)}
                value={form.alias} />
              <FormHelperText>
                Alias/nickname for the datasource<br />
                <strong>Optional.</strong>&nbsp;This value is for your internal usage only (to be used for searches, analytics etc.).
              </FormHelperText>
            </FormControl>
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
