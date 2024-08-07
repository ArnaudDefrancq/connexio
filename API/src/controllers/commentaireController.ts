import { CommentaireModel } from "../models/CommentaireModel";
import { Request, Response, NextFunction } from 'express';
import { Commentaire } from '../types/Commentaire';
import { AuthRequest } from '../middlewares/auth'
import { PostModel } from "../models/PostModel";
import { Post } from '../types/Post';

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

export const getAllCommentaire= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { actif } = req.auth || {};

        const id: number = Number(req.params.idPost);
        if (actif !== '1') {        
            res.status(404).json({ error : 'Pas autorisé'})
            return;
        }

        if (isNaN(id)) {
            res.status(400).json({ error: ' ID pas invalide' });
            return;
        }

        const postModel: PostModel = new PostModel();

        const result: Post[] = await postModel.findById(id);

        if (result && result.length > 0) {
            const commentaireModel: CommentaireModel = new CommentaireModel();
            
            const arrayCommentaire: Commentaire[] = await commentaireModel.findCommentaire(`WHERE id_post = ${id}`);         

            res.status(200).json(arrayCommentaire);
            return;
        } 

        res.status(400).json({error : "Pas de post trouvé"});

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });    
        return;
    }
}

export const deleteCommentaire= async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: ' ID pas invalide' });
            return;
        }

        if (actif == "1" || role == '1') {
            const commentaireModel: CommentaireModel = new CommentaireModel();
            let message;

            const result: Commentaire[] = await commentaireModel.findById(id);

            if (result && result.length > 0) {

                const commentaire: Commentaire = result[0];
                
                if (commentaire.id_profil == Number(userId) || role == '1') {

                    const commentaireDelete = await new Promise<number>((resolve, reject) => {
                        commentaireModel.deleteCommentaire(id, (error, affectedRows) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(affectedRows || 0);
                            }
                        });
                    });

                    message = commentaireDelete;
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