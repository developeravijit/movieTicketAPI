const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const FILE_TYPE = ["jpg", "jpeg", "avif", "webp", "png"];

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUD_FOLDER,
    allowed_formats: FILE_TYPE,
    public_id: (req, file) => {
      const originalName = file.originalname.split(".")[0].trim();
      const unique = originalName.replace(/\s+/g, "_") + "_" + Date.now();

      return unique;
    },
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMime = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = { imageUpload };
