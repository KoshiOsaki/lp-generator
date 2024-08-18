/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToLp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ImageToLp` DROP FOREIGN KEY `_ImageToLp_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ImageToLp` DROP FOREIGN KEY `_ImageToLp_B_fkey`;

-- DropTable
DROP TABLE `Image`;

-- DropTable
DROP TABLE `_ImageToLp`;

-- CreateTable
CREATE TABLE `GenerateImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `prompt` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `storageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreparedImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `storageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenerateImageToLp` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenerateImageToLp_AB_unique`(`A`, `B`),
    INDEX `_GenerateImageToLp_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LpToPreparedImage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LpToPreparedImage_AB_unique`(`A`, `B`),
    INDEX `_LpToPreparedImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GenerateImageToLp` ADD CONSTRAINT `_GenerateImageToLp_A_fkey` FOREIGN KEY (`A`) REFERENCES `GenerateImage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenerateImageToLp` ADD CONSTRAINT `_GenerateImageToLp_B_fkey` FOREIGN KEY (`B`) REFERENCES `Lp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LpToPreparedImage` ADD CONSTRAINT `_LpToPreparedImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LpToPreparedImage` ADD CONSTRAINT `_LpToPreparedImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `PreparedImage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
