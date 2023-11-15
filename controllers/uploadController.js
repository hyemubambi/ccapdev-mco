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
});

module.exports = uploadController;