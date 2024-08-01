import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    auth?: { userId: string; roleId: string }
};



const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization; 

        if (!authHeader) {
            throw new Error('Authorization header missing');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new Error('Token missing');
          }
      
          const decodedToken = jwt.verify(token, process.env.JWT_TOKEN as string) as { userId: string; roleId: string };
          const { userId, roleId } = decodedToken;
      
          req.auth = {  userId, roleId  };
      
          if (req.body.userId && req.body.userId !== userId) {
            throw new Error('User ID non valable');
          } else {
            next();
        }

    } catch (error) {
        res.status(401).json({error: error instanceof Error ? error.message : 'Requête non authentifiée'});
    }
}

export default authMiddleware;