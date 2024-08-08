import express from 'express';
import { createAmitie, updateAmitie, getAmitie, deleteAmitie } from '../controllers/amitieController';
import authMiddleware from '../middlewares/auth';


const amitieRouter = express.Router();

amitieRouter.post('/', authMiddleware ,createAmitie);
amitieRouter.put('/:id', authMiddleware ,updateAmitie);
amitieRouter.get('/', authMiddleware, getAmitie)
amitieRouter.delete('/:id',authMiddleware ,deleteAmitie);

export default amitieRouter;