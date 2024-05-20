import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Stack,
  Input
} from '@mui/material';

export function FormTags({
  label,
  helperText,
  name,
  onChange
}: {
  helperText?: string;
  label?: string;
  name?: string;
  onChange: (tags: string[]) => void;
}): React.JSX.Element {

  const [tags, setTags] = useState<Set<string>>(new Set());
  const [tagValue, setTagValue] = useState<string>('');

  const handleTagAdd = (tagValue: string) => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      return copy;
    });
  };

  useEffect(() => {
    onChange(Array.from(tags));
  }, [tags]);

  const handleTagDelete = useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);
      return copy;
    });
  }, []);

  return (
    <>
      <FormControl>
        <InputLabel>{label || 'Tags'}</InputLabel>
        <input type='hidden' name={name || 'tags'} value={Array.from(tags)} />
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <Button color="secondary"
                size="small"
                disabled={tagValue.length == 0}>
                Add
              </Button>
            </InputAdornment>
          }
          onChange={(event) => {
            const value = event.target.value;
            if (value.endsWith(',') || value.endsWith(' ')) {
              const trimmed = value.trim();
              tags.add(trimmed);
              const t = Array.from(tags);
              onChange(t);
              handleTagAdd(trimmed);
              event.target.value = '';
            }
          }}
        />
        {helperText && <FormHelperText>
          <strong>{helperText}</strong>&nbsp;
        </FormHelperText>}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
          {Array.from(tags.values()).map((tag) => (
            <Chip
              // name={name || 'tags'}
              key={tag}
              label={tag}
              onDelete={() => {
                handleTagDelete(tag);
              }}
              variant="outlined"
            />
          ))}
        </Stack>
      </FormControl>
    </>
  );
}
