import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import formRules from './form-rules';

export function FormInput({
  label,
  name,
  value,
  required,
  error,
  caption,
  placeholder,
  onBlur,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  error: string | undefined;
  caption: string | React.JSX.Element;
  placeholder?: string;
  onBlur?: (e: any) => void;
  onChange?: (val: string) => void;
}): React.JSX.Element {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={e => {
          e.target.value = 'abcd';//e.target.value.trim();
          onBlur?.(e);
        }}
      />
      <FormHelperText error={error != undefined}>{error || caption}</FormHelperText>
    </FormControl>
  );
}
