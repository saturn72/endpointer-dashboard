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
  value,

  // label,
  // name,
  // required,
  // error,
  // caption,
  // placeholder,
  // onChange,
}: {
  value: string;



  // label: string;
  // name: string;
  // required?: boolean;
  // error: string | undefined;
  // caption: string | React.JSX.Element;
  // placeholder?: string;
  // onChange?: (e: any) => void;
}): React.JSX.Element {

  const values = value.split(',').filter(i => i);
  const initVal: Set<string> = values.length > 0 ? new Set(values) : new Set();
  const [tags, setTags] = useState<Set<string>>(initVal);
  const [tagValue, setTagValue] = useState<string>('');

  const handleTagAdd = useCallback(() => {
    if (!tagValue) {
      return;
    }
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      const arr = Array.from(copy);
      value = arr.join(',');

      return copy;
    });

    setTagValue('');
  }, [tagValue]);


  const handleTagDelete = useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);
      console.log('the value is ', copy);
      return copy;
    });
  }, []);

  return (
    <>
      <FormControl>
        <InputLabel>Tags</InputLabel>
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
    </>
  );
}
