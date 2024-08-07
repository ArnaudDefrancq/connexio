import express from 'express';
import { createPostLike } from '../controllers/commentaireController';
import authMiddleware from '../middlewares/auth';


const postLikeRouter = express.Router();

postLikeRouter.post('/',authMiddleware ,createPostLike);

export default postLikeRouter;