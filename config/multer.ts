import multer, { Options } from 'multer';
import fs from 'fs';

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { caminho } = req.body;
      const path = `./uploads/${caminho}`;
      fs.mkdirSync(path, { recursive: true });
      return cb(null, path);
    },
    filename(req, file, callback) {
      const { caminho } = req.body;

      console.log('File Destination Multer: ', file.destination);

      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
  fileFilter: (req, file, cb) => {
    const mimeType = ['application/pdf'];

    if (!mimeType.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
} as Options;
