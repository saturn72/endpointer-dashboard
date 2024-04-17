-- AlterTable
ALTER TABLE `datasource` ADD COLUMN `tags` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(512) NOT NULL;
