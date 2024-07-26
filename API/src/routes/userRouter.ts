import express, {Request, Response} from 'express';
import User from '../types/user';
const userCtrl = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/auth/signup', userCtrl.signup)
userRouter.post('/auth/signin', userCtrl.login)
userRouter.put('/:id', userCtrl.updateUser)

export default userRouter;
