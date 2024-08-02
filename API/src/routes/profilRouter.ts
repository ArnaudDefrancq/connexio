import express from 'express';
import { updateProfil, getAllProfil, deleteProfil } from '../controllers/profilController';
import authMiddleware from '../middlewares/auth';
import getMulterConfigProfil from '../middlewares/multer';


const profilRouter = express.Router();


profilRouter.put('/:id/update', authMiddleware, (req, res,next) => {
    const upload = getMulterConfigProfil('imgProfil', Number(req.params.id));

    upload.fields([
        {name: 'profil', maxCount: 1},
        {name: 'bg', maxCount: 1}
    ])(req, res, next)
}, updateProfil);
profilRouter.get('/', authMiddleware, getAllProfil);
// profilRouter.delete('/:id/delete', authMiddleware, multer, deleteProfil);

export default profilRouter;