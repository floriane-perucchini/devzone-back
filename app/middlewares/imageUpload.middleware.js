import multer from "multer";

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1048576 },
});

export default imageUpload;
