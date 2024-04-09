import { PrismaClient } from "@prisma/client"

    const prisma:PrismaClient = new PrismaClient();
    
    export type CreateDatasourceType = {
        name: string
        alias: string
        comment: string | null
    };

    export type DatasourceEntity =CreateDatasourceType & {
        id:number;
    };
    export async  function createDatasource(data:CreateDatasourceType
    ):Promise<DatasourceEntity>
    {
        return await prisma.datasource.create({data});
    }