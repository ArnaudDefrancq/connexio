import express from 'express';
import authMiddleware from '../middlewares/auth';
import { AmitieController } from '../controllers/amitieController';


const amitieRouter = express.Router();

amitieRouter.post('/', authMiddleware ,AmitieController.createAmitie);
// amitieRouter.put('/:id', authMiddleware ,updateAmitie);
// amitieRouter.get('/', authMiddleware, getAmitie)
// amitieRouter.delete('/:id',authMiddleware ,deleteAmitie);

export default amitieRouter;