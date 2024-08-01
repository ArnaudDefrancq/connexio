import express from 'express';
import { updateProfil, getAllProfil, deleteProfil } from '../controllers/profilController';

const profilRouter = express.Router();

profilRouter.put('/:id/update', updateProfil);
profilRouter.get('/', getAllProfil);
profilRouter.delete('/:id/delete', deleteProfil);

export default profilRouter;