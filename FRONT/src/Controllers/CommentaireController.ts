import { CommentaireModel } from "../Models/CommentaireModel";
import { CommentaireWithProfil, NewCommentaire } from "../Types/Commentaire";

export class CommentaireController {
    static async createCommentaire (commentaire: NewCommentaire, token: string): Promise<void> {
        return await CommentaireModel.createCommentaire(commentaire, token);
    }

    static async getAllCommentaireWithProfil (idPost: number, token: string): Promise<Array<CommentaireWithProfil>> {
        return await CommentaireController.getAllCommentaireWithProfil(idPost, token);
    }

    static async getOneCommentaireWithProfil (idCommentaire: number, token: string): Promise<CommentaireWithProfil> {
        return await CommentaireController.getOneCommentaireWithProfil(idCommentaire, token);
    }

    static async deleteCommentaire (idCommentaire: number, token: string): Promise<void> {
        return await CommentaireController.deleteCommentaire(idCommentaire, token);
    }
}