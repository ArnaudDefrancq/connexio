import { ProfilModel } from "../models/ProfilModel";
import { Request, Response, NextFunction } from 'express';
import { Profil } from '../types/Profil';
import dotenv from 'dotenv';

dotenv.config();

export const createProfil = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {}
export const updateProfil = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {}
export const getAllProfil = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {}
// export const findProfilByName = async (req: Request, res: Response, next: NextFunction) : Promise<Profil[]> => {}
// export const findOneProfilById = async (req: Request, res: Response, next: NextFunction) : Promise<Profil[]> => {}
export const deleteProfil = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {}