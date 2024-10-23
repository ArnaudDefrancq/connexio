import express from 'express';
import { createCommentaire, deleteCommentaire, getAllCommentaireWithProfil } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const commentaireRouter = express.Router();

commentaireRouter.post('/',authMiddleware ,createCommentaire);
commentaireRouter.get('/:idPost', authMiddleware, getAllCommentaireWithProfil);
commentaireRouter.delete('/:id',authMiddleware ,deleteCommentaire);

export default commentaireRouter;