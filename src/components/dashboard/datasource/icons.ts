import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { FileJs as FileJsIcon } from '@phosphor-icons/react/dist/ssr/FileJs';
import { FileSql as FileSqlIcon } from '@phosphor-icons/react/dist/ssr/FileSql';
import { GoogleDriveLogo as GoogleDriveLogoIcon } from '@phosphor-icons/react/dist/ssr/GoogleDriveLogo';
import { MicrosoftExcelLogo as MicrosoftExcelLogoIcon } from '@phosphor-icons/react/dist/ssr/MicrosoftExcelLogo';

export const icons = {
  file: FileIcon,
  'file-sql': FileSqlIcon,
  'file-js': FileJsIcon,
  'google-drive': GoogleDriveLogoIcon,
  excel: MicrosoftExcelLogoIcon,
} as Record<string, Icon>;
