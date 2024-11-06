import express from 'express';
import authMiddleware from '../middlewares/auth';
import { UserController } from '../controllers/UserController';

const userRouter = express.Router();

userRouter.post('/auth/signup', UserController.signup);
userRouter.post('/auth/signin', UserController.login);
userRouter.put('/:id/update',authMiddleware, UserController.updateUser);
userRouter.delete("/:id/delete",authMiddleware, UserController.deleteUser);

export default userRouter;