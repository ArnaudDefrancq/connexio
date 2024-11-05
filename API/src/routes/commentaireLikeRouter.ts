import express from 'express';
import authMiddleware from '../middlewares/auth';
import { CommentaireLikeController } from '../controllers/commentaireLikeController';


const commentaireLikeRouter = express.Router();

commentaireLikeRouter.post('/',authMiddleware ,CommentaireLikeController.createCommentaireLike);
commentaireLikeRouter.get('/:idCommentaire',authMiddleware ,CommentaireLikeController.getAllCommentaireLike);
commentaireLikeRouter.get('/:idCommentaire/like',authMiddleware ,CommentaireLikeController.getOneCommentaireLike);
commentaireLikeRouter.delete('/:id',authMiddleware ,CommentaireLikeController.deleteCommentaireLike);

export default commentaireLikeRouter;