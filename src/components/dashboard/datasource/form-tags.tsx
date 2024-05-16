import React, { useCallback, useState } from 'react';
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
  initValue,
  onChange,
  label,
  helperText
}: {
  initValue?: string;
  onChange: (e: any) => void;
  label?: string;
  helperText?: string;
}): React.JSX.Element {

  const values = initValue?.split(',')?.filter(i => i) ?? [];
  const initVal: Set<string> = new Set(values);
  const [tags, setTags] = useState<Set<string>>(initVal);
  const [tagValue, setTagValue] = useState<string>('');

  const handleTagAdd = useCallback(() => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);

      onChange(Array.from(copy).join(','));

      return copy;
    });

    setTagValue('');
  }, [tagValue]);


  const handleTagDelete = useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);

      onChange(Array.from(copy).join(','));

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
              setTagValue('');
              // event.target.value = '';
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
