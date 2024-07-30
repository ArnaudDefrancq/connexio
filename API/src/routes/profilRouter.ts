import express from 'express';
import { createProfil, updateProfil, getAllProfil, deleteProfil } from '../controllers/profilController';

const profilRouter = express.Router();

profilRouter.post('/create', createProfil);
profilRouter.put('/:id/update', updateProfil);
profilRouter.get('/', getAllProfil);
profilRouter.delete('/:id/delete', deleteProfil);

export default profilRouter;