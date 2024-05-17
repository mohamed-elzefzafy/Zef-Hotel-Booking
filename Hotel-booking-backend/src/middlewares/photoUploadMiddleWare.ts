import path from 'path';
import multer from 'multer';
import DataParser from 'datauri/parser.js';

const storage = multer.memoryStorage();

const parser = new DataParser();

const photoUpload = multer({ storage , 
   limits: {
fileSize: 1 *  1024 * 1024, // 1MB
},
});

export const formatImage = (file: Express.Multer.File) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default photoUpload;

