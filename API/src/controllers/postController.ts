import { PostModel } from "../models/PostModel";
import { Request, Response, NextFunction } from 'express';
import { Post } from '../types/Post';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from '../middlewares/auth'

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {

    } catch (error) {
        
    }
}
export const getAllPost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {}