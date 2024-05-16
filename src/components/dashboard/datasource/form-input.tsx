import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

export function FormInput({
  label,
  name,
  value,
  required,
  error,
  caption,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  error: string | undefined;
  caption: string | React.JSX.Element;
  placeholder?: string;
  onChange?: (e: any) => void;
}): React.JSX.Element {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        required={required}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <FormHelperText error={error != undefined}>{error || caption}</FormHelperText>
    </FormControl>
  );
}
