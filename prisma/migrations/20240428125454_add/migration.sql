/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `datasource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `datasource` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `datasource_createdByUserId_name_key` ON `datasource`;

-- AlterTable
ALTER TABLE `datasource` ADD COLUMN `path` VARCHAR(767) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `datasource_path_key` ON `datasource`(`path`);
