'use client'

import { useFormStatus } from 'react-dom'
import Button from '@mui/material/Button';

export default function SubmitButton({ text}:{text:string}){
     const { pending } = useFormStatus();
     return (<Button type="submit" variant="contained" disabled={pending}> {text||'Submit'}</Button>);
}