import { PostModel } from "../models/PostModel";
import { Request, Response, NextFunction } from 'express';
import { Post } from '../types/Post';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from '../middlewares/auth'
import { Folder } from "../tools/Folder";

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, actif } = req.auth || {};
        const idUser: number = Number(req.params.id);

        if (isNaN(idUser)) {
            res.status(400).json({ error: 'ID utilisateur invalide' });
            return;
        }

        if (idUser == Number(userId) && actif == '1') {
            const postModel: PostModel = new PostModel();
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const date: number = Math.floor(Date.now() / 1000);

            const newPost: Post = {
                content: req.body.content,
                media: files?.media  ? String(files?.media[0].path.split('\\').at(-1)) : null,
                created_at: date,
                updated_at: date,
                id_profil: Number(userId),
            } 

            postModel.createPost(newPost, (error, insertId) => {
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

export const updatePost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const idPost: number = Number(req.params.idPost);
        const idUser: number = Number(req.params.idUser);

        if (isNaN(idPost) && isNaN(idUser)) {
            res.status(400).json({ error: 'ID utilisateur invalide + post' });
            return;
        }

        if ((idUser == Number(userId) && actif == '1') || role == '1') {
            const postModel: PostModel = new PostModel();
            const result: Post[] = await postModel.findById(idPost);
    
            if (result && result.length > 0) {
                const date: number = Math.floor(Date.now() / 1000);
                const post: Post = result[0];

                const files = req.files as { [fieldname: string]: Express.Multer.File[] };

                if (files?.media || post.media != null ) {
                    const oldImagePath = path.join(__dirname, '../img/imgPost/', String(idUser), String(post.media));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
    
                const updatePost: Partial<Post> = {
                    content: req.body.content || "",
                    media: files?.media ? String(files?.media[0].path.split('\\').at(-1)) : null,
                    updated_at: date
                } 

    
                postModel.updatePost(idPost, updatePost, (error, affectedRows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
                    return res.status(201).json({ id: affectedRows });
                })
                return;
    
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
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

export const getAllPost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { actif } = req.auth || {};
        if (actif == '1') {
            const postModel: PostModel = new PostModel();;
            
            const arrayPost: Post[] = await postModel.findPost("");         

            res.status(200).json(arrayPost);
            return;
        } 
        res.status(404).json({ error : 'Pas autorisé'})
        return;

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });    
        return;
    }
}

export const getOnePost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Profil invalide' });
            return;
        }

        if (actif == '1' || role == '1') {
            const postModel: PostModel = new PostModel();
            const result: Post[] = await postModel.findById(id);

            if (result && result.length > 0) {
                const post: Post = result[0];

                res.status(200).json(post);
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

export const deletePost = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: ' ID pas invalide' });
            return;
        }

        if (actif == "1" || role == '1') {
            const postModel: PostModel = new PostModel();
            let message;

            const result: Post[] = await postModel.findById(id);

            if (result && result.length > 0) {

                const post: Post = result[0];
                
                if (post.id_profil == Number(userId) || role == '1') {
                    if (post.media != null) Folder.deleteFolderPost(String(userId), post.media)

                    const postDelete = await new Promise<number>((resolve, reject) => {
                        postModel.deletePost(id, (error, affectedRows) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(affectedRows || 0);
                            }
                        });
                    });

                    message = postDelete;
                    res.status(200).json({ message: 'Post supprimé avec succès ligne affecté => '  + message});
                    return;
                } else {
                    res.status(401).json({error : "Unauthorize"})
                    return;
                }
            } else {
                res.status(404).json({ error: 'Post non trouvé' });
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