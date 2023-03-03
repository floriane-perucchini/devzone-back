import multer from "multer";

const imageUpload = multer({
  dest: "images",
});

export default imageUpload;
