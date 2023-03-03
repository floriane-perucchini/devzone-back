/*
  Warnings:

  - You are about to drop the column `logo` on the `Tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_userId_fkey";

-- DropIndex
DROP INDEX "Tool_logo_idx";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "bookmark_id" INTEGER,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "logo",
ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "order" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tool_id" INTEGER,
    "order" INTEGER DEFAULT 999,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tool_logo_idx" ON "Tool"("icon");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "bookmark_id" FOREIGN KEY ("bookmark_id") REFERENCES "Bookmark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "Tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
