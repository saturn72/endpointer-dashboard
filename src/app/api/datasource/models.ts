export interface DatasourceCreateRequest {
  name: string;
  alias: string;
  tags: string;
  userId: string;
}

export interface Datasource {
  id: number;
  alias: string | undefined;
  comment?: string | null;
  createdByUserId: string;
  createdAtUtc?: Date;
  name: string;
  path: string;
  published: boolean;
  tags: string | undefined;
}

export interface UserResources {
  datasources: Datasource[];
}
