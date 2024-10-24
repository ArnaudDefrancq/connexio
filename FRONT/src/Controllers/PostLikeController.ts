import { PostLikeModel } from "../Models/PostLikeModel";
import { PostLike } from "../Types/PostLike";

export class PostLikeController {
    static async createPostLike (idPost: number, token: string): Promise<void> {
        return  await PostLikeModel.createPostLike(idPost, token);
    }

    static async getAllPostLike (idPost: number, token: string): Promise<Array<PostLike>> {
        return await PostLikeModel.getAllPostLike(idPost, token);
    }

    static async getOnePostLike (idPost: number, token: string): Promise<PostLike> {
        return await PostLikeModel.getOnePostLike(idPost, token);
    }

    static async deletePostLike (idPostLike: number, token: string): Promise<void> {
        return await PostLikeModel.deletePostLike(idPostLike, token);
    }
}