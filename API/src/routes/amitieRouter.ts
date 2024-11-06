import express from 'express';
import authMiddleware from '../middlewares/auth';
import { AmitieController } from '../controllers/AmitieController';


const amitieRouter = express.Router();

amitieRouter.post('/', authMiddleware ,AmitieController.createAmitie);
amitieRouter.put('/:idAmitie/:slug', authMiddleware ,AmitieController.updateAmitie);
amitieRouter.get('/:id/:slug', authMiddleware, AmitieController.getAmitie)
amitieRouter.delete('/:id',authMiddleware ,AmitieController.deleteAmitie);

export default amitieRouter;