import express from 'express';
import { getAllPostWithProfil, createPost, updatePost, getOnePostWithProfil, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';
import { getMulterConfigPost } from '../middlewares/multer';


const postRouter = express.Router();

postRouter.post('/:id/post',authMiddleware, (req, res,next) => {
        const upload = getMulterConfigPost('imgPost', Number(req.params.id));
    
        upload.fields([
            {name: 'media', maxCount: 1},
        ])(req, res, next)
},createPost);

postRouter.put('/:idUser/update/:idPost', authMiddleware, (req, res,next) => {
    const upload = getMulterConfigPost('imgPost', Number(req.params.idUser));

    upload.fields([
        {name: 'media', maxCount: 1},
    ])(req, res, next)
}, updatePost);

postRouter.get('/', authMiddleware, getAllPostWithProfil);

postRouter.get('/:id', authMiddleware, getOnePostWithProfil);

postRouter.delete('/:id/delete', authMiddleware, deletePost);

export default postRouter;