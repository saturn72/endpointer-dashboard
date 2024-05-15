import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

export function FormInput({
  name,
  value,
  required,
  error,
  caption,
  onChange,
}: {
  name: string;
  value: string;
  required?: boolean;
  error: string | undefined;
  caption: string | React.JSX.Element;
  onChange?: (e: any) => void;
}): React.JSX.Element {
  return (
    <FormControl>
      <InputLabel>Datasource name</InputLabel>
      <OutlinedInput
        required={required}
        name={name}
        placeholder="my-greatest-datasource"
        onChange={onChange}
        value={value}
      />
      <FormHelperText error={error != undefined}>{error || caption}</FormHelperText>
    </FormControl>
  );
}
