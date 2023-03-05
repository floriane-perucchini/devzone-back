/*
  Warnings:

  - A unique constraint covering the columns `[imgId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_imgId_key" ON "User"("imgId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("imgId") ON DELETE CASCADE ON UPDATE CASCADE;
