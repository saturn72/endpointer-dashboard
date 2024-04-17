export interface DatasourceCreateRequest {
  name: string;
  alias: string;
  tags: string;
  userId: string;
}

export interface Datasource {
  id: number;
  name: string;
  alias: string | undefined;
  tags: string | undefined;
  userId: string;
}
