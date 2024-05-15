'use client';

import Button from '@mui/material/Button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="contained" disabled={pending}>
      {' '}
      {text || 'Submit'}
    </Button>
  );
}
