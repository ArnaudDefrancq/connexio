import express from 'express';
import { createCommentaire, deleteCommentaire, getAllCommentaireWithProfil, getOneCommentaireWithProfil } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const commentaireRouter = express.Router();

commentaireRouter.post('/',authMiddleware ,createCommentaire);
commentaireRouter.get('/:idPost', authMiddleware, getAllCommentaireWithProfil);
commentaireRouter.get('/:idPost/commentaire', authMiddleware, getOneCommentaireWithProfil);
commentaireRouter.delete('/:id',authMiddleware ,deleteCommentaire);

export default commentaireRouter;