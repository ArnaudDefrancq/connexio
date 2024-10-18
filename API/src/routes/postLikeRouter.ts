import express from 'express';
import { createPostLike, getAllPostLike, getOnePostLike, deletePostLike } from '../controllers/postLikeController';
import authMiddleware from '../middlewares/auth';


const postLikeRouter = express.Router();

postLikeRouter.post('/:idPost',authMiddleware ,createPostLike);
postLikeRouter.get('/:idPost',authMiddleware ,getAllPostLike);
postLikeRouter.get('/:idPost/like',authMiddleware ,getOnePostLike);
postLikeRouter.delete('/:id',authMiddleware ,deletePostLike);
export default postLikeRouter;