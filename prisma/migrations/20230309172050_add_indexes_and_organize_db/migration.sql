-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "githubToken" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubUsername" TEXT;

-- CreateIndex
CREATE INDEX "Token_githubToken_idx" ON "Token"("githubToken");

-- CreateIndex
CREATE INDEX "User_githubUsername_idx" ON "User"("githubUsername");
