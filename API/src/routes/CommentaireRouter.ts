import express from 'express';
import { createCommentaire } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const commentaireRouter = express.Router();

commentaireRouter.post('/:idUser/commentaire/:idPost',authMiddleware ,createCommentaire);

export default commentaireRouter;