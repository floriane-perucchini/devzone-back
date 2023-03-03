/*
  Warnings:

  - You are about to drop the column `bookmarkId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - Made the column `mimeType` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropIndex
DROP INDEX "Image_bookmarkId_key";

-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "bookmarkId",
DROP COLUMN "type",
DROP COLUMN "userId",
ALTER COLUMN "mimeType" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imgId" INTEGER;

-- RenameForeignKey
ALTER TABLE "Bookmark" RENAME CONSTRAINT "Bookmark_userId_fkey" TO "bookmark_userId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
