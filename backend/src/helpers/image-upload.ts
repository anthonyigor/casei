import multer from "multer";
import path from "path";


const imageStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/uploads/images')
    },

    filename(req, file, callback) {
        callback(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStorage
})

export default imageUpload