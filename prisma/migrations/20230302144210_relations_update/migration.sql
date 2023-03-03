/*
  Warnings:

  - You are about to drop the column `imgId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropIndex
DROP INDEX "User_imgId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgId";

-- RenameForeignKey
ALTER TABLE "Bookmark" RENAME CONSTRAINT "bookmark_userId_fkey" TO "Bookmark_userId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
