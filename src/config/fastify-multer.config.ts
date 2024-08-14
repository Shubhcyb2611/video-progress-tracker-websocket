// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import * as multer from 'fastify-multer';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// export const multerOptions : MulterOptions = {
//   storage: diskStorage({
//     destination: './uploads/videos',
//     filename: (req, file, callback) => {
//       const filename = `${Date.now()}${extname(file.originalname)}`;
//       callback(null, filename);
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     if (!file.mimetype.startsWith('video/')) {
//       return callback(
//         new Error('Invalid file type. Only video files are allowed.'),
//       );
//     }
//     callback(null, true);
//   },
// };

import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerOptions: MulterOptions = {
  fileFilter: (req, file, callback) => {
    const fileExtension = extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.mp4']; // Add allowed file types here
    console.log(allowedExtensions);
    if (allowedExtensions.includes(fileExtension)) {
      callback(null, true); // Accept the file
    } else {
      callback(new Error('Unsupported file type'), false); // Reject the file
    }
  },
};
