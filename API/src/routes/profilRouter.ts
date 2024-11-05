import express from 'express';
import authMiddleware from '../middlewares/auth';
import { getMulterConfigProfil } from '../middlewares/multer';
import { ProfilController } from '../controllers/profilController';


const profilRouter = express.Router();


profilRouter.put('/:id/update', authMiddleware, (req, res,next) => {
    const upload = getMulterConfigProfil('imgProfil', Number(req.params.id));

    upload.fields([
        {name: 'profil', maxCount: 1},
        {name: 'bg', maxCount: 1}
    ])(req, res, next)
}, ProfilController.updateProfil);

profilRouter.get('/', authMiddleware, ProfilController.getAllProfil);

profilRouter.get('/:id/profil', authMiddleware, ProfilController.getProfilById);

export default profilRouter;