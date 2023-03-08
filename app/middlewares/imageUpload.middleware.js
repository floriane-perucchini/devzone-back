import multer from "multer";

const imageUpload = multer({
  storage: multer.memoryStorage(),
});

export default imageUpload;
