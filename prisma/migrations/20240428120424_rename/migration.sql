/*
  Warnings:

  - You are about to drop the `userpermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `userpermissions`;

-- CreateTable
CREATE TABLE `userRoles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub` TEXT NOT NULL,
    `roles` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
