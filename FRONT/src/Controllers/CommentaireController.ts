import { CommentaireModel } from "../Models/CommentaireModel";
import { CommentaireWithProfil, NewCommentaire } from "../Types/Commentaire";

export class CommentaireController {
    static async createCommentaire (commentaire: NewCommentaire, token: string): Promise<void> {
        return await CommentaireModel.createCommentaire(commentaire, token);
    }

    static async getAllCommentaireWithProfil (idPost: number, token: string): Promise<Array<CommentaireWithProfil>> {
        return await CommentaireModel.getAllCommentaireWithProfil(idPost, token);
    }

    static async getOneCommentaireWithProfil (idCommentaire: number, token: string): Promise<CommentaireWithProfil> {
        return await CommentaireModel.getOneCommentaireWithProfil(idCommentaire, token);
    }

    static async deleteCommentaire (idCommentaire: number, token: string): Promise<void> {
        return await CommentaireModel.deleteCommentaire(idCommentaire, token);
    }
}