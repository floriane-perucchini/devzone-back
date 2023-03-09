/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'server',
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'server';

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_url_key" ON "Avatar"("url");

-- CreateIndex
CREATE INDEX "Avatar_type_idx" ON "Avatar"("type");

-- CreateIndex
CREATE INDEX "User_type_idx" ON "User"("type");
