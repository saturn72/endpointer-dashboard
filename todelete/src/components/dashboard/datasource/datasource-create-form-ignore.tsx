// 'use client';

// import { FormEvent, useReducer, useState } from 'react'
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Select from '@mui/material/Select';
// import Grid from '@mui/material/Unstable_Grid2';
// import FileUploadButton from '@/components/core/file-upload-button';

// const datasourceMimeTypes = [
//   { value: 'application/json', label: 'JSON' },
//   { value: 'text/csv', label: 'CSV' },
//   { value: 'application/xml', label: 'XML' },
//   { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'XLSX' },
// ];

// type ReducerCommand = {
//   type: 'set-file-type' | 'set-file-content',
//   value: string | ArrayBuffer | null | undefined
// };

// function reducer(
//   state: any,
//   fi: ReducerCommand) {
//   switch (fi.type) {
//     case 'set-file-type':
//       const mt = datasourceMimeTypes.find(x => x.value == fi.value);
//       delete state.content;

//       return Object.assign({}, state, {
//         accept: mt?.value,
//       });

//     case 'set-file-content':
//       return Object.assign({}, state, {
//         file: fi.value
//       });

//     default:
//       return state;
//   }
// }


// export function DatasourceCreateForm() {
//   const [fileInfo, dispatch] = useReducer(reducer, { accept: 'application/json' });
//   const [loading, setLoading] = useState(false);

//   async function handleFormSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
//     event.preventDefault();
//     setLoading(true);
//     const formData = new FormData(event.currentTarget);

//     const file = formData.get("file") as File;
//     const blob = await file.arrayBuffer();
//     setLoading(false);
//   }

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <Card>
//         <CardHeader subheader="Datasource's information" title="Info" />
//         <Divider />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid md={6} xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Name</InputLabel>
//                 <OutlinedInput
//                   label="Name"
//                   name="name" />
//               </FormControl>
//             </Grid>
//             <Grid md={6} xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Alias</InputLabel>
//                 <OutlinedInput label="Alias" name="alias" />
//               </FormControl>
//             </Grid>
//             <Grid md={6} xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Type</InputLabel>
//                 <Select
//                   defaultValue={datasourceMimeTypes[0].value}
//                   label="Type"
//                   name="accept"
//                   variant="outlined"
//                   onChange={e => dispatch({ type: 'set-file-type', value: e.target.value })
//                   }
//                 >

//                   {datasourceMimeTypes.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid md={6} xs={12}>
//               <FormControl fullWidth>
//                 <FileUploadButton
//                   loading={loading}
//                   name="file"
//                   accept={fileInfo.accept}
//                   onContent={(content) => dispatch({ type: 'set-file-content', value: content })} />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button variant="contained" type='submit'>Create Datasource</Button>
//         </CardActions>
//       </Card>
//     </form >
//   );
// }
