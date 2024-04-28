/*
  Warnings:

  - You are about to drop the column `string` on the `userpermissions` table. All the data in the column will be lost.
  - Added the required column `permissions` to the `userPermissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userpermissions` DROP COLUMN `string`,
    ADD COLUMN `permissions` MEDIUMTEXT NOT NULL;
