-- CreateIndex
CREATE INDEX "Image_fileName_idx" ON "Image"("fileName");

-- CreateIndex
CREATE INDEX "Image_filePath_idx" ON "Image"("filePath");

-- CreateIndex
CREATE INDEX "Image_mimeType_idx" ON "Image"("mimeType");

-- CreateIndex
CREATE INDEX "Image_size_idx" ON "Image"("size");

-- CreateIndex
CREATE INDEX "Token_emailToken_idx" ON "Token"("emailToken");

-- CreateIndex
CREATE INDEX "Token_jwtRefreshToken_idx" ON "Token"("jwtRefreshToken");

-- CreateIndex
CREATE INDEX "Token_expiration_idx" ON "Token"("expiration");
