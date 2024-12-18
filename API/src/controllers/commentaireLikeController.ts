import { CommentaireLikeModel } from "../models/CommentaireLikeModel";
import { CommentaireModel } from "../models/CommentaireModel";
import { Request, Response, NextFunction } from 'express';
import { CommentaireLike } from '../types/CommentaireLike';
import { Commentaire } from '../types/Commentaire';
import { AuthRequest } from '../middlewares/auth';

export class CommentaireLikeController {
    static async createCommentaireLike (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { userId, actif } = req.auth || {};
    
            if (actif == '1') {
                const commentaireLikeModel: CommentaireLikeModel = new CommentaireLikeModel();
    
                const like: Array<CommentaireLike> = await commentaireLikeModel.findCommentaireLike(`WHERE id_commentaire=${req.body.idCommentaire} AND id_profil=${userId}`);
    
                if (like && like.length == 0) {
                    const newCommentaireLike: CommentaireLike = {
                        id_profil: Number(userId),
                        id_commentaire: Number(req.body.idCommentaire)
                    } 
        
                    commentaireLikeModel.createCommentaireLike(newCommentaireLike, (error, insertId) => {
                        if (error) {
                            return res.status(500).json({ error });
                        }
                        return res.status(201).json({ id: insertId });
                    });
                    return;
                } else {
                    res.status(404).json({error: 'Déjà like'});
                    return;
                }
            }
    
            res.status(401).json({error: 'Compte pas actif'});
            return;
    
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }

    static async getAllCommentaireLike (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { actif } = req.auth || {};
    
            const id: number = Number(req.params.idCommentaire);
            if (actif != '1') {        
                res.status(404).json({ error : 'Pas autorisé'})
                return;
            }
    
            if (isNaN(id)) {
                res.status(400).json({ error: ' ID pas invalide' });
                return;
            }
    
            const commentaireModel: CommentaireModel = new CommentaireModel();
    
            const result: Commentaire[] = await commentaireModel.findById(id);
    
            if (result && result.length > 0) {
                const commentaireLikeModel: CommentaireLikeModel = new CommentaireLikeModel();
                
                const arrayCommentaireLike: CommentaireLike[] = await commentaireLikeModel.findCommentaireLike(`WHERE id_commentaire = ${id}`);         
    
                res.status(200).json(arrayCommentaireLike);
                return;
            } 
    
            res.status(400).json({error : "Pas de post trouvé"});
    
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }

    static async getOneCommentaireLike (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { userId, actif } = req.auth || {};
            if (actif == '1') {
                const commentaireLikeModel: CommentaireLikeModel = new CommentaireLikeModel();
    
                const like: Array<CommentaireLike> = await commentaireLikeModel.findCommentaireLike(`WHERE id_commentaire=${req.params.idCommentaire} AND id_profil=${userId}`);
    
                if (like && like.length != 0) {
                    res.status(200).json(like);
                    return;
                } else {
                    res.status(400).json({message: 'Rien trouvé'});
                    return;
                }
            } else {
                res.status(401).json({error: 'Compte pas actif'});
                return;
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }

    static async deleteCommentaireLike (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { userId, role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
    
            if (isNaN(id)) {
                res.status(400).json({ error: ' ID pas invalide' });
                return;
            }
    
            if (actif == "1" || role == '1') {
                const commentaireLikeModel: CommentaireLikeModel = new CommentaireLikeModel();
                let message;
    
                const result: CommentaireLike[] = await commentaireLikeModel.findById(id);
    
                if (result && result.length > 0) {
    
                    const commentaireLike: CommentaireLike = result[0];
                    
                    if (commentaireLike.id_profil == Number(userId) || role == '1') {
    
                        const commentaireLikeDelete = await new Promise<number>((resolve, reject) => {
                            commentaireLikeModel.deleteCommentaireLike(id, (error, affectedRows) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(affectedRows || 0);
                                }
                            });
                        });
    
                        message = commentaireLikeDelete;
                        res.status(200).json({ message: 'commentaire supprimé avec succès ligne affecté => '  + message});
                        return;
                    } else {
                        res.status(401).json({error : "Unauthorize"})
                        return;
                    }
                } else {
                    res.status(404).json({ error: 'commentaire non trouvé' });
                    return;
                }
            }
            res.status(404).json({message: 'Les ID ne correspondent pas'});
            return;
    
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });
            return;
        }
    
    }
}