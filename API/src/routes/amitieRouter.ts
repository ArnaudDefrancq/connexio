import express from 'express';
import authMiddleware from '../middlewares/auth';
import { AmitieController } from '../controllers/AmitieController';


const amitieRouter = express.Router();

amitieRouter.post('/', authMiddleware ,AmitieController.createAmitie);
amitieRouter.put('/:idAmitie', authMiddleware ,AmitieController.updateAmitie);
amitieRouter.get('/:id/:slug', authMiddleware, AmitieController.getAmitieWithProfil)
amitieRouter.get('/:id', authMiddleware, AmitieController.getOneAmitie)
amitieRouter.delete('/:id',authMiddleware ,AmitieController.deleteAmitie);

export default amitieRouter;