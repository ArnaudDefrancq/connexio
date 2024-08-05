import express from 'express';
import { getAllPost, createPost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';
import getMulterConfigProfil from '../middlewares/multer';


const postRouter = express.Router();

postRouter.post('/',authMiddleware, createPost);
// postRouter.put('/:id/update', authMiddleware, (req, res,next) => {
//     const upload = getMulterConfigProfil('imgProfil', Number(req.params.id));

//     upload.fields([
//         {name: 'profil', maxCount: 1},
//         {name: 'bg', maxCount: 1}
//     ])(req, res, next)
// }, updateProfil);

postRouter.get('/', authMiddleware, getAllPost);

// postRouter.get('/:id/profil', authMiddleware, getProfilById);

export default postRouter;