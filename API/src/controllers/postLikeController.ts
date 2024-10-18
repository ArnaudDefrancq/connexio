import { PostLikeModel } from "../models/PostLikeModel";
import { PostModel } from "../models/PostModel";
import { Request, Response, NextFunction } from 'express';
import { PostLike } from '../types/PostLike';
import { Post } from '../types/Post';
import { AuthRequest } from '../middlewares/auth'

export const createPostLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, actif } = req.auth || {};

        if (actif == '1') {
            const postLikeModel: PostLikeModel = new PostLikeModel();

            const like: Array<PostLike> = await postLikeModel.findPostLike(`WHERE id_post=${req.params.idPost} AND id_profil=${userId}`);
            
            if (like && like.length == 0) {
                const newPostLike: PostLike = {
                    id_profil: Number(userId),
                    id_post: Number(req.params.idPost)
                }              
    
                postLikeModel.createPostLike(newPostLike, (error, insertId) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
                    return res.status(201).json({ id: insertId });
                });
            } else {
                res.status(404).json({error: 'Déjà like'});
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

export const getAllPostLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
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
            const postLikeModel: PostLikeModel = new PostLikeModel();
            
            const arrayPostLike: PostLike[] = await postLikeModel.findPostLike(`WHERE id_post = ${id}`);         

            res.status(200).json(arrayPostLike);
            return;
        } 

        res.status(400).json({error : "Pas de post trouvé"});

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });    
        return;
    }
} 

export const getOnePostLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, actif } = req.auth || {};
        if (actif == '1') {
            const postLikeModel: PostLikeModel = new PostLikeModel();

            const like: Array<PostLike> = await postLikeModel.findPostLike(`WHERE id_post=${req.params.idPost} AND id_profil=${userId}`);

            console.log(like);
            

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

export const deletePostLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: ' ID pas invalide' });
            return;
        }

        if (actif == "1" || role == '1') {
            const postLikeModel: PostLikeModel = new PostLikeModel();
            let message;

            const result: PostLike[] = await postLikeModel.findById(id);

            if (result && result.length > 0) {

                const postLike: PostLike = result[0];
                
                if (postLike.id_profil == Number(userId) || role == '1') {

                    const postLikeDelete = await new Promise<number>((resolve, reject) => {
                        postLikeModel.deletePostLike(id, (error, affectedRows) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(affectedRows || 0);
                            }
                        });
                    });

                    message = postLikeDelete;
                    res.status(200).json({ message: 'like supprimé avec succès ligne affecté => '  + message});
                    return;
                } else {
                    res.status(401).json({error : "Unauthorize"})
                    return;
                }
            } else {
                res.status(404).json({ error: 'like non trouvé' });
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