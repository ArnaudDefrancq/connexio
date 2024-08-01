import multer from 'multer';
import path from 'path';

const getMulterConfig = (folder: string) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `../img/${folder}`)); 
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });

    return multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });
};

export default getMulterConfig;
