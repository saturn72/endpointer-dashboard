import { failure, success, ValidationResult } from '@/core/validation/types';

import { getDatasourceByPath } from './datasource-service';
import { DatasourceCreateRequest } from './models';
import { name } from './rules';

export async function validateForCreate(datasource: DatasourceCreateRequest): Promise<ValidationResult> {
  const e = await getDatasourceByPath(datasource.userId, datasource.name);

  if (e && e != null) {
    return failure(404, { key: 'name', message: name.duplicateMessage });
  }

  return success();
}
