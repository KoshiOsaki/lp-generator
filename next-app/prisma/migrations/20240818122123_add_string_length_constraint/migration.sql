-- AlterTable
ALTER TABLE `GenerateImage` MODIFY `model` VARCHAR(255) NOT NULL,
    MODIFY `prompt` TEXT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `storageUrl` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `ImageDefault` MODIFY `model` VARCHAR(255) NOT NULL,
    MODIFY `prompt` TEXT NULL;

-- AlterTable
ALTER TABLE `Item` MODIFY `imageUrl` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Lp` MODIFY `url` VARCHAR(255) NULL,
    MODIFY `model` VARCHAR(255) NOT NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `prompt` TEXT NULL;

-- AlterTable
ALTER TABLE `LpDefault` MODIFY `model` VARCHAR(255) NOT NULL,
    MODIFY `prompt` TEXT NULL;

-- AlterTable
ALTER TABLE `PreparedImage` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `storageUrl` VARCHAR(255) NOT NULL;
