export function DatasourceById({ id }: { id: string }) {
  return (
    <>
      <h1>{id}</h1>
    </>
    // <form action={formAction}>
    //   <Card>
    //     <CardHeader subheader="Datasource's information" title="Info" />
    //     <Divider />
    //     <CardContent>
    //       <Grid container spacing={3}>
    //         <Grid md={6} xs={12}>
    //           <FormControl fullWidth required>

    //             <TextField
    //               label="Name"
    //               name="name"
    //               helperText="Datasource's name"
    //               required
    //               />
    //           </FormControl>
    //         </Grid>
    //         <Grid md={6} xs={12}>
    //           <FormControl fullWidth>
    //             <TextField
    //             label="Alias"
    //             name="alias"
    //             helperText="Nickname for this datasource."/>
    //           </FormControl>
    //         </Grid>
    //        <Grid lg={12} md={12} xs={12}>
    //           <FormControl fullWidth>
    //             <TextField label="Comment" name="comment"
    //             helperText="Any comment related to the datasource."
    //             multiline minRows={5} />
    //           </FormControl>
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //     <Divider />
    //     <CardActions sx={{ justifyContent: 'flex-end' }}>
    //       <SubmitButton text='Save' />
    //     </CardActions>
    //   </Card>
    // </form >
  );
}
