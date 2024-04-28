/*
  Warnings:

  - A unique constraint covering the columns `[sub]` on the table `userRoles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userroles` MODIFY `sub` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `userRoles_sub_key` ON `userRoles`(`sub`);
