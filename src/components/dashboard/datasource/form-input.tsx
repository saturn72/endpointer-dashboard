import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@mui/material';

export function FormInput({
  label,
  name,
  value,
  required,
  error,
  caption,
  placeholder,
  onBlur,
  onFocus,
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
  onFocus?: (e: any) => void;
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
        onFocus={onFocus}
      />
      <FormHelperText error={error != undefined}>{error || caption}</FormHelperText>
    </FormControl>
  );
}
