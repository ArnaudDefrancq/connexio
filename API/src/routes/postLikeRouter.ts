import express from 'express';
import authMiddleware from '../middlewares/auth';
import { PostLikeController } from '../controllers/postLikeController';


const postLikeRouter = express.Router();

postLikeRouter.post('/',authMiddleware ,PostLikeController.createPostLike);
postLikeRouter.get('/:idPost',authMiddleware ,PostLikeController.getAllPostLike);
postLikeRouter.get('/:idPost/like',authMiddleware ,PostLikeController.getOnePostLike);
postLikeRouter.delete('/:id',authMiddleware ,PostLikeController.deletePostLike);
export default postLikeRouter;