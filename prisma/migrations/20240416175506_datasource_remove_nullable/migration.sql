/*
  Warnings:

  - Made the column `createdByUserId` on table `datasource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `datasource` MODIFY `createdByUserId` VARCHAR(255) NOT NULL;
