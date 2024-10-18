import { PostLikeModel } from "../Models/PostLikeModel";

export class PostLikeController {
    static async createPostLike (idPost: number, token: string): Promise<void> {
        return  await PostLikeModel.createPostLike(idPost, token);
    }
}