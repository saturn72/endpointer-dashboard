import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Select } from '@mui/material';
import { icons } from './icons';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Option } from '@/components/core/option';
import { DatasourceFileConnection } from './connections/datasource-file-connection';
import { DatasourceSqlConnection } from './connections/datasource-sql-connection';

type TypeOption =  { 
  text: string; 
  component: any, //() => React.JSX.Element,
  value: string; 
  // description:string;
  disabled?: boolean, 
  icon: Icon,
  attributes?:any
 };
 export interface DatasourceCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}


export function DatasourceConnectionStep({ onBack, onNext }: DatasourceCategoryStepProps): React.JSX.Element {
 
const typeOptions: TypeOption[] = [
  { 
    text: 'File', 
    // description: 'Upload file datasource', 
    value: 'file',
    icon: icons['file'],
    component: DatasourceFileConnection,
    attributes:{
      onUploaded: (files:File[]) => {
        setFiles(files);
      }
    }
  },
  {
    text: 'SQL Database',
    // description: 'Read the content a table or execute SQL Script',
    value: 'sql',
    icon: icons['file-sql'],
    component: DatasourceSqlConnection
  },
  { 
    text: 'nosql Database',
    // description: 'Read the content an index',
    value: 'nosql',
    icon: icons['file-js'],
    disabled:true,
    component: DatasourceFileConnection
  },
  { 
    text: 'Google Sheet',
    // description: 'Read from google sheet',
    value: 'goggle-sheet',
    disabled:true,
    icon: icons['google-drive'],
    component: DatasourceFileConnection
  },
  { 
    text: 'Excel Online',
    // description: 'Read from excel online',
    value: 'excel-online',
    disabled:true,
    icon: icons['excel'],
    component: DatasourceFileConnection
  },
] ;


  const [type, setType] = React.useState<TypeOption>(typeOptions[0]);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleTypeChange = React.useCallback((newType: string) => {
    const type = typeOptions.find(o => o.value == newType) ?? typeOptions[0];
    setType(type);
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">Connect to datasource</Typography>
      </div>
      <Select defaultValue={typeOptions[0].value}
        onChange={(event) => {
          handleTypeChange(event.target.value);
        }}>
          {typeOptions.map((option) => (
            <Option
              key={option.value}
              disabled={option.disabled}
              value={option.value}
            >
                  {<option.icon/>}&nbsp;{option.text}
                </Option>
              ))} 
      </Select>
      {files.length}
      {<type.component {...type.attributes} />}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={onBack} startIcon={<ArrowLeftIcon />}>
          Back
        </Button>
        <Button endIcon={<ArrowRightIcon />} onClick={onNext} variant="contained">
          Continue
        </Button>
      </Stack>
    </Stack>
  );
}
