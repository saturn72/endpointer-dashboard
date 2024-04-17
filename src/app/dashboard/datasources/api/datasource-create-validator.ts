import { failure, success, ValidationResult } from '@/core/validation/types';

import { name } from '../Consts';
import { getUserDatasources } from './datasource-service';
import { DatasourceCreateRequest } from './models';

export async function validate(datasource: DatasourceCreateRequest): Promise<ValidationResult> {
  const entities = await getUserDatasources(datasource.userId, Number.MAX_VALUE, 0);

  const duplicateName = entities.some((e) => e.name == datasource.name);
  if (duplicateName) {
    return failure(404, name.duplicateMessage);
  }

  return success();
  //check that
}
