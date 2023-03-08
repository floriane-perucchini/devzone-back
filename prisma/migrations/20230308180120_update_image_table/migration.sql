/*
  Warnings:

  - You are about to drop the column `mimeType` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filePath]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Image_mimeType_idx";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "mimeType",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Image_filePath_key" ON "Image"("filePath");
