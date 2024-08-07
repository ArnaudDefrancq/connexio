import { AmitieModel } from "../models/AmitieModel";
import { Request, Response, NextFunction } from 'express';
import { Amitie } from '../types/Amitie';
import { AuthRequest } from '../middlewares/auth'


export const createAmitie= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
}