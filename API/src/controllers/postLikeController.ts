import { PostLike } from "../models/PostLikeModel";
import { Request, Response, NextFunction } from 'express';
import { PostLike } from '../types/PostLike';
import { AuthRequest } from '../middlewares/auth'

export const createPostLike= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
}
