const path = require('path');

const multer = require("multer");
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, './public/uploads');
   },

   filename: (req, file, cb) => {
       console.log(file);
       cb(null, Date.now() + path.extname(file.originalname));
   }
});

const uploadController = multer({
   storage: storage,
   limits: { files: 4},
}).fields([
   { name: 'review-photos', maxCount: 4 },
   { name: 'image', maxCount: 1 },
]);

const singleUploadController = multer({
   storage: storage,
   limits: { files: 1},
}).single('image');

module.exports = { uploadController, singleUploadController };