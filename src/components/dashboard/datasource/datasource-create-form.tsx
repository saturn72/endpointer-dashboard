'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import type { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

import { DatasourceDescriptionStep } from './datasource-description-step';
import { DatasourceConnectionStep } from './datasource-connection-step';
import { DatasourceDetailsStep } from './datasource-details-step';
import { DatasourcePreview } from './datasource-preview';

function StepIcon({ active, completed, icon }: StepIconProps): React.JSX.Element {
  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        ...(highlight && {
          bgcolor: 'var(--mui-palette-primary-main)',
          color: 'var(--mui-palette-primary-contrastText)',
        }),
      }}
      variant="rounded"
    >
      {completed ? <CheckIcon /> : icon}
    </Avatar>
  );
}

export function DatasourceCreateForm(): React.JSX.Element {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  const handleNext = React.useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = React.useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = React.useMemo(() => {
    return [
      { label: 'Datasource Details', content: <DatasourceDetailsStep onNext={handleNext} /> },
      { label: 'Connect to Datasource', content: <DatasourceConnectionStep onBack={handleBack} onNext={handleNext} /> },
      { label: 'Description', content: <DatasourceDescriptionStep onBack={handleBack} onNext={handleComplete} /> },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <DatasourcePreview />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-root': { ml: '19px' },
        '& .MuiStepConnector-line': { borderLeft: '2px solid var(--mui-palette-divider)' },
        '& .MuiStepLabel-iconContainer': { paddingRight: '16px' },
        '& .MuiStepContent-root': { borderLeft: '2px solid var(--mui-palette-divider)', ml: '19px' },
        '& .MuiStep-root:last-of-type .MuiStepContent-root': { borderColor: 'transparent' },
      }}
    >
      {steps.map((step) => {
        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography variant="overline">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ px: 2, py: 3 }}>{step.content}</Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}

// 'use client';

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import * as React from 'react';
// import RouterLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Select from '@mui/material/Select';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Unstable_Grid2';
// import type { EditorEvents } from '@tiptap/react';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { logger } from '@/lib/default-logger';
// import { Option } from '@/components/core/option';
// import { TextEditor } from '@/components/core/text-editor/text-editor';
// import { toast } from '@/components/core/toaster';

// const schema = zod.object({
//   name: zod.string().min(1, 'Name is required').max(255),
//   alias: zod.string().max(255).optional(),
//   category: zod.string().max(255).optional(),
//   type: zod.string().max(255).optional(),
//   description: zod.string().max(5000).optional(),
//   tags: zod.string().max(255).optional(),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues = {
//   name: '',
//   alias: '',
//   category: '',
//   type: 'physical',
//   description: '',
//   tags: '',
// } satisfies Values;


// const steps = [
// 'Select master blaster campaign settings',
// 'Create an ad group',
// 'Create an ad',
// ];


// export function DatasourceCreateForm(): React.JSX.Element {
//   const [activeStep, setActiveStep] = React.useState<number>(0);
//   const [isComplete, setIsComplete] = React.useState<boolean>(false);

//   const handleNext = React.useCallback(() => {
//     setActiveStep((prevState) => prevState + 1);
//   }, []);

//   const handleBack = React.useCallback(() => {
//     setActiveStep((prevState) => prevState - 1);
//   }, []);

//   const handleComplete = React.useCallback(() => {
//     setIsComplete(true);
//   }, []);

//   const steps = React.useMemo(() => {
//     return [
//       { label: 'Category', content: <DatasourceCategoryStep onBack={handleBack} onNext={handleNext} /> },
//       { label: 'Datasource Details', content: <DatasourceDetailsStep onBack={handleBack} onNext={handleNext} /> },
//       { label: 'Description', content: <DatasourceDescriptionStep onBack={handleBack} onNext={handleComplete} /> },
//     ];
//   }, [handleBack, handleNext, handleComplete]);

//   if (isComplete) {
//     return <DatasourcePreview />;
//   }

//   return (
//     <Stepper
//       activeStep={activeStep}
//       orientation="vertical"
//       sx={{
//         '& .MuiStepConnector-root': { ml: '19px' },
//         '& .MuiStepConnector-line': { borderLeft: '2px solid var(--mui-palette-divider)' },
//         '& .MuiStepLabel-iconContainer': { paddingRight: '16px' },
//         '& .MuiStepContent-root': { borderLeft: '2px solid var(--mui-palette-divider)', ml: '19px' },
//         '& .MuiStep-root:last-of-type .MuiStepContent-root': { borderColor: 'transparent' },
//       }}
//     >
//       {steps.map((step) => {
//         return (
//           <Step key={step.label}>
//             <StepLabel StepIconComponent={StepIcon}>
//               <Typography variant="overline">{step.label}</Typography>
//             </StepLabel>
//             <StepContent>
//               <Box sx={{ px: 2, py: 3 }}>{step.content}</Box>
//             </StepContent>
//           </Step>
//         );
//       })}
//     </Stepper>
//   );
// }
// // : React.JSX.Element {
// //   const router = useRouter();

// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

// //   const onSubmit = React.useCallback(
// //     async (_: Values): Promise<void> => {
// //       try {
// //         // Make API request
// //         toast.success('Datasource created');
// //         router.push(paths.dashboard.datasources.list);
// //       } catch (err) {
// //         logger.error(err);
// //         toast.error('Something went wrong!');
// //       }
// //     },
// //     [router]
// //   );

// //   return (

// //     <>
// //     <Box sx={{ width: '100%' }}>
// //       <Stepper activeStep={1} alternativeLabel>
// //         {steps.map((label) => (
// //           <Step key={label}>
// //             <StepLabel>{label}</StepLabel>
// //           </Step>
// //         ))}
// //       </Stepper>
// //     </Box>

// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <Card>
// //         <CardContent>
// //           <Stack divider={<Divider />} spacing={4}>
// //             <Stack spacing={3}>
// //               <Typography variant="h6">Basic information</Typography>
// //               <Grid container spacing={3}>
// //                 <Grid md={6} xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="name"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.name)} fullWidth>
// //                         <InputLabel required>Datasource name</InputLabel>
// //                         <OutlinedInput {...field} />
// //                         {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
// //                       </FormControl>
// //                     )}
// //                   />
// //                 </Grid>
// //                 <Grid md={6} xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="alias"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.alias)} fullWidth>
// //                         <InputLabel>Alias</InputLabel>
// //                         <OutlinedInput {...field} />
// //                         {errors.alias ? <FormHelperText>{errors.alias.message}</FormHelperText> : null}
// //                       </FormControl>
// //                     )}
// //                     />
// //                 </Grid>
// //                 <Grid md={6} xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="category"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.category)} fullWidth>
// //                         <InputLabel>Category</InputLabel>
// //                         <Select {...field}>
// //                           <Option value="">Select a category</Option>
// //                           <Option value="Healthcare">Healthcare</Option>
// //                           <Option value="Makeup">Makeup</Option>
// //                           <Option value="Skincare">Skincare</Option>
// //                         </Select>
// //                         {errors.category ? <FormHelperText error>{errors.category.message}</FormHelperText> : null}
// //                       </FormControl>
// //                     )}
// //                   />
// //                 </Grid>
// //                 <Grid md={6} xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="type"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.type)} fullWidth>
// //                         <InputLabel>Type</InputLabel>
// //                         <Select {...field}>
// //                           <Option value="physical">Physical</Option>
// //                           <Option value="digital">Digital</Option>
// //                           <Option value="service">Service</Option>
// //                         </Select>
// //                         {errors.type ? <FormHelperText error>{errors.type.message}</FormHelperText> : null}
// //                       </FormControl>
// //                     )}
// //                   />
// //                 </Grid>
// //                 <Grid xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="description"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.description)} fullWidth>
// //                         <InputLabel>Description</InputLabel>
// //                         <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
// //                           <TextEditor
// //                             content={field.value ?? ''}
// //                             onUpdate={({ editor }: EditorEvents['update']) => {
// //                               field.onChange(editor.getText());
// //                             }}
// //                             placeholder="Write something"
// //                           />
// //                         </Box>
// //                         {errors.description ? (
// //                           <FormHelperText error>{errors.description.message}</FormHelperText>
// //                         ) : null}
// //                       </FormControl>
// //                     )}
// //                   />
// //                 </Grid>
// //                 <Grid xs={12}>
// //                   <Controller
// //                     control={control}
// //                     name="tags"
// //                     render={({ field }) => (
// //                       <FormControl error={Boolean(errors.name)} fullWidth>
// //                         <InputLabel>Tags</InputLabel>
// //                         <OutlinedInput {...field} placeholder="e.g Modern, Clean, etc" />
// //                         {errors.name ? (
// //                           <FormHelperText>{errors.name.message}</FormHelperText>
// //                         ) : (
// //                           <FormHelperText>Tags must be separated by comma</FormHelperText>
// //                         )}
// //                       </FormControl>
// //                     )}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </Stack>
// //           </Stack>
// //         </CardContent>
// //         <CardActions sx={{ justifyContent: 'flex-end' }}>
// //           <Button color="secondary" component={RouterLink} href={paths.dashboard.datasources.list}>
// //             Cancel
// //           </Button>
// //           <Button type="submit" variant="contained">
// //             Create datasource
// //           </Button>
// //         </CardActions>
// //       </Card>
// //     </form>
// //                         </>
// //   );
// // }
