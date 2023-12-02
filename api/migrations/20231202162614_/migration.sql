/*
  Warnings:

  - Added the required column `picture` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MenuItem` ADD COLUMN `picture` VARCHAR(191) NOT NULL;
