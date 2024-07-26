import express from 'express';
import { signup, login, updateUser, deleteUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/signin', login);
userRouter.put('/:id/update', updateUser);
userRouter.delete("/:id/delete", deleteUser);

export default userRouter;