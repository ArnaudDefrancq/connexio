import { CommentaireLikeModel } from "../Models/CommentaireLikeModel";
import CommentaireLike from "../Types/CommentaireLike";

export class CommentaireLikeController {
    static async createCommentaireLike (idCommentaire: number, token: string): Promise<void> {
        return await CommentaireLikeModel.createCommentaireLike(idCommentaire, token);
    }
    static async getAllCommentaireLike (idCommentaire: number, token: string): Promise<Array<CommentaireLike>> {
        return await CommentaireLikeModel.getAllCommentaireLike(idCommentaire, token);
    }
    static async getOneCommentaireLike (idCommentaire: number, token: string): Promise<CommentaireLike> {
        return await CommentaireLikeModel.getOneCommentaireLike(idCommentaire, token);
    }
    static async deleteCommentiareLike (idCommentaireLike: number, token: string): Promise<void> {
        return await CommentaireLikeModel.deleteCommentaireLike(idCommentaireLike, token);
    }
}