/*
  Warnings:

  - You are about to drop the column `linkImg` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "bookmark_toolId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "bookmark_userId_fkey";

-- DropIndex
DROP INDEX "Bookmark_linkImg_idx";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "linkImg",
ADD COLUMN     "imgId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "imgId" INTEGER;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" BIGINT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_fileName_key" ON "Image"("fileName");

-- CreateIndex
CREATE INDEX "Bookmark_imgId_idx" ON "Bookmark"("imgId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "bookmark_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
