-- AlterTable
ALTER TABLE `datasource` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `alias` VARCHAR(255) NULL;