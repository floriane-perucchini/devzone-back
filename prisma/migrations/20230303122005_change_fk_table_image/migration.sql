/*
  Warnings:

  - You are about to drop the column `user_id` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "user_id";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "user_id";
