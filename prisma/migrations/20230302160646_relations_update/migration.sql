/*
  Warnings:

  - You are about to drop the column `imgId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- DropIndex
DROP INDEX "User_imgId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgId";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
