import express from 'express';
import { createAmitie } from '../controllers/amitieController';
import authMiddleware from '../middlewares/auth';


const amitieRouter = express.Router();

amitieRouter.post('/',authMiddleware ,createAmitie);
// amitieRouter.get('/:idCommentaire',authMiddleware ,getAllCommentaireLike);
// amitieRouter.delete('/:id',authMiddleware ,deleteCommentaireLike);

export default amitieRouter;