import multer from "multer";

const imageUpload = multer({
  dest: "public/images",
});

export default imageUpload;
