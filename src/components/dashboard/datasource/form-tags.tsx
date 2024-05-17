import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Stack
} from '@mui/material';

export function FormTags({
  value,
  label,
  helperText,
  onChange
}: {
  value?: string;
  label?: string;
  helperText?: string;
  onChange: (value: string) => void;
}): React.JSX.Element {

  const initTags = value?.split(',')?.filter(i => i) ?? [];
  const initVal: Set<string> = new Set(initTags);
  const [tags, setTags] = useState<Set<string>>(initVal);
  const [tagValue, setTagValue] = useState<string>('');

  const handleTagAdd = useCallback(() => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      return copy;
    });

    setTagValue('');
  }, [tagValue]);

  useEffect(() => {
    onChange(Array.from(tags).join(','));
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
        <OutlinedInput
          value={tagValue}
          endAdornment={
            <InputAdornment position="end">
              <Button color="secondary" onClick={handleTagAdd} size="small" disabled={tagValue.length == 0}>
                Add
              </Button>
            </InputAdornment>
          }
          name="tags"
          onChange={(event) => {
            const value = event.target.value;
            setTagValue(value);
            if (value.endsWith(',') || value.endsWith(' ')) {
              handleTagAdd();
            }
          }}
        />
        {helperText && <FormHelperText>
          <strong>{helperText}</strong>&nbsp;
        </FormHelperText>}
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
    </>
  );
}
