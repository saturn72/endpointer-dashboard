-- CreateTable
CREATE TABLE `userPermissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub` TEXT NOT NULL,
    `string` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
