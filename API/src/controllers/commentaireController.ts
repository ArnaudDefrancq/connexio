import { CommentaireModel } from "../models/CommentaireModel";
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth'
import { PostModel } from "../models/PostModel";
import { Post } from '../types/Post';
import CommentaireLike from "../types/CommentaireLike";
import { CommentaireLikeModel } from "../models/CommentaireLikeModel";
import Commentaire from "../types/Commentaire";


export class CommentaireController {
    static async createCommentaire (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { actif, userId } = req.auth || {};
    
            if (actif == '1') {
                const commentaireModel: CommentaireModel = new CommentaireModel();
                const postModel: PostModel = new PostModel();
    
                const post: Array<Post> = await postModel.findById(req.body.id_post);
                
                if (post && post.length === 1) {
                    if (req.body.id_profil == userId) {
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
                    } else {
                        res.status(400).json({error: 'les Id ne correspondent pas'});
                        return;
                    }
                } else {
                    res.status(400).json({error: 'Post pas trouvé'});
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

    static async getAllCommentaireWithProfil (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { actif } = req.auth || {};
    
            const id: number = Number(req.params.idPost);
            if (actif != '1') {        
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
                const query = `SELECT com.id_commentaire, com.content, com.created_at, com.id_post, com.id_profil,
                profil.nom, profil.prenom, profil.img_profil FROM cx__commentaire AS com JOIN cx__profil as profil ON com.id_profil = profil.id_profil WHERE com.id_post=${id}`;
    
                
                const arrayCommentaire: Commentaire[] = await commentaireModel.findCommentaire(``, "", query);         
    
                res.status(200).json(arrayCommentaire);
                return;
            } 
    
            res.status(400).json({error : "Pas de post trouvé"});
    
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }
    

    static async getOneCommentaireWithProfil (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { role, actif } = req.auth || {};
            const idCommentaire: number = Number(req.params.idPost);
    
            if (isNaN(idCommentaire)) {
                res.status(400).json({ error: 'ID no valable' });
                return;
            }
    
            if (actif == '1' || role == '1') {
                const commentaireModel: CommentaireModel = new CommentaireModel();
    
                const query = `SELECT com.id_commentaire, com.content, com.created_at, com.id_post, com.id_profil,
                profil.nom, profil.prenom, profil.img_profil FROM cx__commentaire AS com JOIN cx__profil as profil ON com.id_profil = profil.id_profil WHERE id_commentaire=${idCommentaire}`;
    
                const result: Commentaire[] = await commentaireModel.findById(idCommentaire, '', query);
    
                if (result && result.length > 0) {
                    const commentaire: Commentaire = result[0];
    
                    res.status(200).json(commentaire);
                    return
                }
            } else {
                res.status(404).json({ error: 'Post non trouvé' });
                return;
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }

    static async deleteCommentaire (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { userId, role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
    
            if (isNaN(id)) {
                res.status(400).json({ error: ' ID pas invalide' });
                return;
            }
    
            if (actif == "1" || role == '1') {
                const commentaireModel: CommentaireModel = new CommentaireModel();
                const commentaireLikeModel: CommentaireLikeModel = new CommentaireLikeModel();
    
                let message;
    
                const result: Commentaire[] = await commentaireModel.findById(id);
    
                if (result && result.length > 0) {
    
                    const commentaire: Commentaire = result[0];
                    
                    if (commentaire.id_profil == Number(userId) || role == '1') {
    
                        const commentaireLike: Array<CommentaireLike> = await  commentaireLikeModel.findCommentaireLike(`WHERE id_commentaire=${id}`);
    
                        commentaireLike.forEach(async (comLike) => {
                            await new Promise<number>((resolve, reject) => {
                                commentaireLikeModel.deleteCommentaireLike(Number(comLike.id_commentaire_like), (error, affectedRows) => {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(affectedRows || 0);
                                    }
                                })
                            })
                        });
    
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
}