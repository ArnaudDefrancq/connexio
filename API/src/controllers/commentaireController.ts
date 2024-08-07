import { CommentaireModel } from "../models/CommentaireModel";
import { Request, Response, NextFunction } from 'express';
import { Commentaire } from '../types/Commentaire';
import { AuthRequest } from '../middlewares/auth'

export const createCommentaire= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { actif } = req.auth || {};

        if (actif == '1') {
            const commentaireModel: CommentaireModel = new CommentaireModel();
            const date: number = Math.floor(Date.now() / 1000);

            const newCommentaire: Commentaire = {
                content: req.body.content,
                created_at: date,
                id_profil: req.body.id_profil,
                id_post: req.body.id_post
            } 

            commentaireModel.createCommentaire(newCommentaire, (error, insertId) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                return res.status(201).json({ id: insertId });
            });
            return;
        }

        res.status(401).json({error: 'Compte pas actif'});
        return;

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });    
        return;
    }
}

export const deleteCommentaire= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {}