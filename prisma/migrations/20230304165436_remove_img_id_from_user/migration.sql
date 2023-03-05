/*
  Warnings:

  - You are about to drop the column `imgId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_imgId_idx";

-- DropIndex
DROP INDEX "User_imgId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgId";
