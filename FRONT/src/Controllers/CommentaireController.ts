import { CommentaireModel } from "../Models/CommentaireModel";
import { NewCommentaire } from "../Types/Commentaire";

export class CommentaireController {
    static async createCommentaire (commentaire: NewCommentaire, token: string) {
        return await CommentaireModel.createCommentaire(commentaire, token);
    }
}