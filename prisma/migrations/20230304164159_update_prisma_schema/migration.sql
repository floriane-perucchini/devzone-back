/*
  Warnings:

  - You are about to drop the column `toolId` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imgId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `ToolsOnUsers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_toolId_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_categoryId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "toolId",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ToolsOnUsers" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Bookmark_description_idx" ON "Bookmark"("description");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_description_idx" ON "Category"("description");

-- CreateIndex
CREATE INDEX "Category_order_idx" ON "Category"("order");

-- CreateIndex
CREATE INDEX "Image_userId_idx" ON "Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_categoryId_key" ON "Tool"("categoryId");

-- CreateIndex
CREATE INDEX "Tool_description_idx" ON "Tool"("description");

-- CreateIndex
CREATE INDEX "Tool_link_idx" ON "Tool"("link");

-- CreateIndex
CREATE INDEX "Tool_order_idx" ON "Tool"("order");

-- CreateIndex
CREATE UNIQUE INDEX "User_imgId_key" ON "User"("imgId");

-- CreateIndex
CREATE INDEX "User_password_idx" ON "User"("password");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_active_idx" ON "User"("active");

-- CreateIndex
CREATE INDEX "User_imgId_idx" ON "User"("imgId");

-- RenameForeignKey
ALTER TABLE "Bookmark" RENAME CONSTRAINT "bookmark_toolId_fkey" TO "Bookmark_toolId_fkey";

-- RenameForeignKey
ALTER TABLE "Bookmark" RENAME CONSTRAINT "bookmark_userId_fkey" TO "Bookmark_userId_fkey";

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Tool_logo_idx" RENAME TO "Tool_icon_idx";
