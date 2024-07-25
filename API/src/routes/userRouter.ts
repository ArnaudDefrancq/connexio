import express, {Request, Response} from 'express';
import User from '../types/user';
const userCtrl = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/', userCtrl.signup)

export default userRouter;
