import express from 'express';
import authMiddleware from '../middlewares/auth';
import { CommentaireController } from '../controllers/commentaireController';


const commentaireRouter = express.Router();

commentaireRouter.post('/',authMiddleware ,CommentaireController.createCommentaire);
commentaireRouter.get('/:idPost', authMiddleware, CommentaireController.getAllCommentaireWithProfil);
commentaireRouter.get('/:idPost/commentaire', authMiddleware, CommentaireController.getOneCommentaireWithProfil);
commentaireRouter.delete('/:id',authMiddleware ,CommentaireController.deleteCommentaire);

export default commentaireRouter;