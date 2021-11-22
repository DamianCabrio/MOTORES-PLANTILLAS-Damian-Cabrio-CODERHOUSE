import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: __dirname + "../../public/images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(JSON.stringify({
        status: "error",
        message:
          "Por favor, suba una imagen con un formato soportado (jpg, jpeg, png y gif)",
        payload: null,
      }));
    }
    cb(null, true);
  },
});

export default upload;
