import { PostModel } from "../Models/PostModel";
import { Post, PostWithProfil } from "../Types/Post";

export class PostController {
    static async createPost (post: Post, id: number, token: string): Promise<void> {
        return await PostModel.createPost(post, id, token);
    }

    static async getAllPost (token: string): Promise<Array<PostWithProfil> | void> {
        return await PostModel.getAllPost(token);
    }
}