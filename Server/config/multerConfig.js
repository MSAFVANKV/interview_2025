import multer from "multer";
import fs from "fs";

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/svg+xml": "svg",
};

const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./public/uploads/product/";
    let uploadPathBanner = "./public/uploads/banners";
    console.log(file.fieldname,'file.fieldname');
    

    if (file.mimetype.startsWith("image/")) {
      if (file.fieldname === "banner") {
        uploadPath = uploadPathBanner // Save to banners folder
      } else if (file.fieldname === "thumbnail") {
        uploadPath += "thumbnail/";
      } else if (/^variations\[\d+\]\.photos$/.test(file.fieldname)) {
        uploadPath += "productImages/";
      }
    } else {
      return cb(new Error("Invalid file type"), false);
    }

    createDirectory(uploadPath);
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    const fieldName = file.fieldname.replace(/\[|\]/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanOriginalName = file.originalname.split(" ").join("-");

    cb(null, `${cleanOriginalName}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 15 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const isValid = !!FILE_TYPE_MAP[file.mimetype];
    const uploadError = isValid ? null : new Error("Invalid file type");
    cb(uploadError, isValid);
  },
});

const variationFields = Array.from({ length: 10 }, (_, i) => ({
  name: `variations[${i}].photos`,
  maxCount: 10,
}));
const bannerFields = [
  { name: 'banner', maxCount: 10 },
];

variationFields.unshift({ name: "thumbnail", maxCount: 1 });

export const productUploadOptions = upload.fields([
  ...variationFields,
  ...bannerFields,
  { name: "files", maxCount: 10 },
]);
