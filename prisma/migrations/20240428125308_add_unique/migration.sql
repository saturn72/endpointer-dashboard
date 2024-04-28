/*
  Warnings:

  - A unique constraint covering the columns `[createdByUserId,name]` on the table `datasource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `datasource_createdByUserId_name_key` ON `datasource`(`createdByUserId`, `name`);
