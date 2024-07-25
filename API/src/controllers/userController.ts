import { UserModel } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user';
import { Security } from "../tools/Security";

exports.signup = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const userModel = new UserModel();
        const hash = await Security.hashPassword(req.body.password);
        const date: number = Math.floor(Date.now() / 1000);
    
        const user: User = {
            email: req.body.email,
            password: String(hash),
            created_at: date,
            id_role: req.body.id_role
        }
    
        userModel.createUser(user, (error, insertId) => {
            if (error) {
                return next(error);
            }
            res.status(201).json({ id: insertId});
        });
    } catch (error) {
        next(error);
    }
}