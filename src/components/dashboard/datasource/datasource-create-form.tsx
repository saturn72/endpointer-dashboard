"use client"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import SubmitButton from '@/components/core/submit-button';
import { useFormState } from 'react-dom';
import { createDatasource } from './server-actions';
import { Button } from '@mui/material';

const initialState= {
  isError:false
}

export function DatasourceCreateForm() {
  const [state, formAction] = useFormState(createDatasource, initialState)

  return (
    <form action={formAction}>
      <Card>
        <CardHeader subheader="Datasource's information" title="Info" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  label="Name"
                  name="name" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Alias</InputLabel>
                <OutlinedInput label="Alias" name="alias" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <SubmitButton text='Save' />
        </CardActions>
      </Card>
    </form >
  );
}
