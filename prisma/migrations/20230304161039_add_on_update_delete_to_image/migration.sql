-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
