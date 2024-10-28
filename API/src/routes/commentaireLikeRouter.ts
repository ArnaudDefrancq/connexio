import express from 'express';
import { createCommentaireLike, getAllCommentaireLike, deleteCommentaireLike, getOneCommentaireLike } from '../controllers/commentaireLikeController';
import authMiddleware from '../middlewares/auth';


const commentaireLikeRouter = express.Router();

commentaireLikeRouter.post('/',authMiddleware ,createCommentaireLike);
commentaireLikeRouter.get('/:idCommentaire',authMiddleware ,getAllCommentaireLike);
commentaireLikeRouter.get('/:idCommentaire/like',authMiddleware ,getOneCommentaireLike);
commentaireLikeRouter.delete('/:id',authMiddleware ,deleteCommentaireLike);

export default commentaireLikeRouter;