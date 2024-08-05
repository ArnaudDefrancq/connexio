import multer from 'multer';
import path from 'path';
import { AuthRequest } from '../middlewares/auth'

export const getMulterConfigProfil = (folder: string, id: number) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname == 'bg') cb(null, path.join(__dirname, `../img/${folder}/${id}/bg`)); 
            if (file.fieldname == 'profil') cb(null, path.join(__dirname, `../img/${folder}/${id}/profil`)); 
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


export const getMulterConfigPost = (folder: string, id: number) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `../img/${folder}/${id}`)); 
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