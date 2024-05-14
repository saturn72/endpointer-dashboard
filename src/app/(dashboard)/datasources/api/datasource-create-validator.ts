import { failure, success, ValidationResult } from '@/core/validation/types';

import { name } from '../Consts';
import { getDatasourceByPath } from './datasource-service';
import { DatasourceCreateRequest } from './models';

export async function validateForCreate(datasource: DatasourceCreateRequest): Promise<ValidationResult> {
  const e = await getDatasourceByPath(datasource.userId, datasource.name);

  if (e && e != null) {
    return failure(404, { key: 'name', message: name.duplicateMessage });
  }

  return success();
}
