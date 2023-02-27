-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
