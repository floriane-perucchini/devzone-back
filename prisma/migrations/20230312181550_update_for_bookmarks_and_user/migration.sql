/*
  Warnings:

  - You are about to drop the column `githubToken` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Avatar` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Avatar_url_key";

-- DropIndex
DROP INDEX "Token_githubToken_idx";

-- AlterTable
ALTER TABLE "Avatar" ALTER COLUMN "fileName" DROP NOT NULL,
ALTER COLUMN "filePath" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "githubToken",
ALTER COLUMN "emailToken" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_link_key" ON "Bookmark"("link");
