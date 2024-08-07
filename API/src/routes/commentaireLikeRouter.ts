import express from 'express';
import { createCommentaireLike, getAllCommentaireLike, deleteCommentaireLike } from '../controllers/commentaireLikeController';
import authMiddleware from '../middlewares/auth';


const commentaireLikeRouter = express.Router();

commentaireLikeRouter.post('/',authMiddleware ,createCommentaireLike);
commentaireLikeRouter.get('/:idCommentaire',authMiddleware ,getAllCommentaireLike);
commentaireLikeRouter.delete('/:id',authMiddleware ,deleteCommentaireLike);

export default commentaireLikeRouter;