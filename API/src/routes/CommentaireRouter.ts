import express from 'express';
import { createCommentaire, deleteCommentaire } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const commentaireRouter = express.Router();

commentaireRouter.post('/',authMiddleware ,createCommentaire);
commentaireRouter.post('/:id/delete',authMiddleware ,deleteCommentaire);

export default commentaireRouter;