import { CommentaireModel } from "../models/CommentaireModel";
import { Request, Response, NextFunction } from 'express';
import { Commentaire } from '../types/Commentaire';
import { AuthRequest } from '../middlewares/auth'

export const createCommentaire= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {

}
