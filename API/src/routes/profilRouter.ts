import express from 'express';
import { updateProfil, getAllProfil, deleteProfil } from '../controllers/profilController';
import authMiddleware from '../middlewares/auth';


const profilRouter = express.Router();

profilRouter.put('/:id/update', authMiddleware, updateProfil);
profilRouter.get('/', authMiddleware, getAllProfil);
profilRouter.delete('/:id/delete', authMiddleware, deleteProfil);

export default profilRouter;