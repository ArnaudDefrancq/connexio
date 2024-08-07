import { CommentaireLikeModel } from "../models/CommentaireLikeModel";
// import { PostModel } from "../models/PostModel";
import { Request, Response, NextFunction } from 'express';
import { CommentaireLike } from '../types/CommentaireLike';
// import { Post } from '../types/Post';
import { AuthRequest } from '../middlewares/auth'

export const createCommentaireLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    // try {
    //     const { actif } = req.auth || {};

    //     if (actif == '1') {
    //         const postLikeModel: PostLikeModel = new PostLikeModel();

    //         const newPostLike: PostLike = {
    //             id_profil: req.body.id_profil,
    //             id_post: req.body.id_post
    //         } 

    //         postLikeModel.createPostLike(newPostLike, (error, insertId) => {
    //             if (error) {
    //                 return res.status(500).json({ error });
    //             }
    //             return res.status(201).json({ id: insertId });
    //         });
    //         return;
    //     }

    //     res.status(401).json({error: 'Compte pas actif'});
    //     return;

    // } catch (error) {
    //     res.status(500).json({ error: 'Erreur interne du serveur' });    
    //     return;
    // }
}

export const getAllCommentaireLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    // try {
    //     const { actif } = req.auth || {};

    //     const id: number = Number(req.params.idPost);
    //     if (actif !== '1') {        
    //         res.status(404).json({ error : 'Pas autorisé'})
    //         return;
    //     }

    //     if (isNaN(id)) {
    //         res.status(400).json({ error: ' ID pas invalide' });
    //         return;
    //     }

    //     const postModel: PostModel = new PostModel();

    //     const result: Post[] = await postModel.findById(id);

    //     if (result && result.length > 0) {
    //         const postLikeModel: PostLikeModel = new PostLikeModel();
            
    //         const arrayPostLike: PostLike[] = await postLikeModel.findPostLike(`WHERE id_post = ${id}`);         

    //         res.status(200).json(arrayPostLike);
    //         return;
    //     } 

    //     res.status(400).json({error : "Pas de post trouvé"});

    // } catch (error) {
    //     res.status(500).json({ error: 'Erreur interne du serveur' });    
    //     return;
    // }
} 

export const deleteCommentaireLike = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    // try {
    //     const { userId, role, actif } = req.auth || {};
    //     const id: number = Number(req.params.id);

    //     if (isNaN(id)) {
    //         res.status(400).json({ error: ' ID pas invalide' });
    //         return;
    //     }

    //     if (actif == "1" || role == '1') {
    //         const postLikeModel: PostLikeModel = new PostLikeModel();
    //         let message;

    //         const result: PostLike[] = await postLikeModel.findById(id);

    //         if (result && result.length > 0) {

    //             const postLike: PostLike = result[0];
                
    //             if (postLike.id_profil == Number(userId) || role == '1') {

    //                 const postLikeDelete = await new Promise<number>((resolve, reject) => {
    //                     postLikeModel.deletePostLike(id, (error, affectedRows) => {
    //                         if (error) {
    //                             reject(error);
    //                         } else {
    //                             resolve(affectedRows || 0);
    //                         }
    //                     });
    //                 });

    //                 message = postLikeDelete;
    //                 res.status(200).json({ message: 'commentaire supprimé avec succès ligne affecté => '  + message});
    //                 return;
    //             } else {
    //                 res.status(401).json({error : "Unauthorize"})
    //                 return;
    //             }
    //         } else {
    //             res.status(404).json({ error: 'commentaire non trouvé' });
    //             return;
    //         }
    //     }
    //     res.status(404).json({message: 'Les ID ne correspondent pas'});
    //     return;

    // } catch (error) {
    //     res.status(500).json({ error: 'Erreur interne du serveur' });
    //     return;
    // }

}