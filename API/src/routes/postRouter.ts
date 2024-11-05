import express from 'express';
import authMiddleware from '../middlewares/auth';
import { getMulterConfigPost } from '../middlewares/multer';
import { PostController } from '../controllers/postController';


const postRouter = express.Router();

postRouter.post('/:id/post',authMiddleware, (req, res,next) => {
        const upload = getMulterConfigPost('imgPost', Number(req.params.id));
    
        upload.fields([
            {name: 'media', maxCount: 1},
        ])(req, res, next)
}, PostController.createPost);

postRouter.put('/:idUser/update/:idPost', authMiddleware, (req, res,next) => {
    const upload = getMulterConfigPost('imgPost', Number(req.params.idUser));

    upload.fields([
        {name: 'media', maxCount: 1},
    ])(req, res, next)
}, PostController.updatePost);

postRouter.get('/', authMiddleware, PostController.getAllPostWithProfil);

postRouter.get('/:id', authMiddleware, PostController.getOnePostWithProfil);

postRouter.delete('/:id/delete', authMiddleware, PostController.deletePost);

export default postRouter;