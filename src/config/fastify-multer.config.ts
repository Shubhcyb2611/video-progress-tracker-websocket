// src/config/fastify-multer.config.ts

import * as multer from 'fastify-multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/videos',
    filename: (req, file, callback) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('video/')) {
      return callback(
        new Error('Invalid file type. Only video files are allowed.'),
      );
    }
    callback(null, true);
  },
};
