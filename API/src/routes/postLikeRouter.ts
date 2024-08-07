import express from 'express';
import { createPostLike, deletePostLike } from '../controllers/postLikeController';
import authMiddleware from '../middlewares/auth';


const postLikeRouter = express.Router();

postLikeRouter.post('/',authMiddleware ,createPostLike);
postLikeRouter.delete('/:id',authMiddleware ,deletePostLike);

export default postLikeRouter;