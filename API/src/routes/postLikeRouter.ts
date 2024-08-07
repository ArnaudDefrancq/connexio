import express from 'express';
import { createPostLike, getAllPostLike, deletePostLike } from '../controllers/postLikeController';
import authMiddleware from '../middlewares/auth';


const postLikeRouter = express.Router();

postLikeRouter.post('/',authMiddleware ,createPostLike);
postLikeRouter.get('/:idPost',authMiddleware ,getAllPostLike);
postLikeRouter.delete('/:id',authMiddleware ,deletePostLike);

export default postLikeRouter;