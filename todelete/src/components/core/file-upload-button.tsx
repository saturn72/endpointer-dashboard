import { ChangeEvent } from 'react';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploadButton({
  name,
  accept,
  onContent,
  loading,
}: {
  name: string;
  accept: string;
  loading: boolean;
  onContent: (x: string | ArrayBuffer | null) => void;
}) {
  const handleFileUpload = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = changeEvent.target.files;
    if (files && files.length !== 0) {
      reader.onload = (ev) => onContent(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<UploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput name={name} type="file" accept={accept} onChange={handleFileUpload} />
    </LoadingButton>
  );
}
