import express from 'express';
import { signup, login, updateUser, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/auth';

const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/signin', login);
userRouter.put('/:id/update',authMiddleware, updateUser);
userRouter.delete("/:id/delete", deleteUser);

export default userRouter;