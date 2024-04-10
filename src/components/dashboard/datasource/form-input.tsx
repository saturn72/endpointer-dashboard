import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

export function FormInput({ name, value, error, caption, onChange }:
  { name: string, value: string, error: string | undefined, caption: string | React.JSX.Element, onChange?: (e: any) => void }): React.JSX.Element {
  return (
    <FormControl>
      <InputLabel>Datasource name</InputLabel>
      <OutlinedInput required
        name={name}
        placeholder="my-greatest-datasource"
        onChange={onChange}
        value={value}
      />
      <FormHelperText error={error != undefined}>{error || caption}</FormHelperText >
    </FormControl>
  );
}
