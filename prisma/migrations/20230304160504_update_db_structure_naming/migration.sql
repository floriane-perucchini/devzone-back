/*
  Warnings:

  - You are about to drop the column `imgId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ToolsOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ToolsOnUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_imgId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_id_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_userId_fkey";

-- DropIndex
DROP INDEX "Bookmark_imgId_idx";

-- DropIndex
DROP INDEX "Tool_logo_idx";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "imgId",
ADD COLUMN     "imgLink" TEXT;

-- AlterTable
CREATE SEQUENCE image_id_seq;
ALTER TABLE "Image" DROP COLUMN "type",
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "id" SET DEFAULT nextval('image_id_seq');
ALTER SEQUENCE image_id_seq OWNED BY "Image"."id";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "logo",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "ToolsOnUsers" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "toolId" INTEGER,
    "order" INTEGER DEFAULT 999,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bookmark_imgLink_idx" ON "Bookmark"("imgLink");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- CreateIndex
CREATE INDEX "Tool_logo_idx" ON "Tool"("icon");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
