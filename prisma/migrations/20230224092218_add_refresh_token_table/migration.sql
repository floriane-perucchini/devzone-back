/*
  Warnings:

  - You are about to drop the column `userId` on the `Tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnUsers" DROP CONSTRAINT "ToolsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToolsOnUsers" ADD CONSTRAINT "ToolsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnUsers" ADD CONSTRAINT "ToolsOnUsers_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
