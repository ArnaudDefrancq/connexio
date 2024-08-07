import express from 'express';
import { createCommentaire, deleteCommentaire, getAllCommentaire } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const commentaireRouter = express.Router();

commentaireRouter.post('/',authMiddleware ,createCommentaire);
commentaireRouter.get('/:idPost', authMiddleware, getAllCommentaire);
commentaireRouter.delete('/:id',authMiddleware ,deleteCommentaire);

export default commentaireRouter;