'use client';

import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormState } from 'react-dom';

import SubmitButton from '@/components/core/submit-button';

import { createDatasource } from './server-actions';

const initialState = {
  isError: false,
};

export function DatasourceCreateForm() {
  const [state, formAction] = useFormState(createDatasource, initialState);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader subheader="Datasource's information" title="Info" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <TextField label="Name" name="name" helperText="Datasource's name" required />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <TextField label="Alias" name="alias" helperText="Nickname for this datasource." />
              </FormControl>
            </Grid>
            <Grid lg={12} md={12} xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Comment"
                  name="comment"
                  helperText="Any comment related to the datasource."
                  multiline
                  minRows={5}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <SubmitButton text="Save" />
        </CardActions>
      </Card>
    </form>
  );
}
