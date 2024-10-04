import { PostModel } from "../Models/PostModel";
import { newPost, PostWithProfil } from "../Types/Post";

export class PostController {
    static async createPost (post: newPost, id: number, token: string): Promise<void> {
        return await PostModel.createPost(post, id, token);
    }

    static async getAllPost (token: string): Promise<Array<PostWithProfil> | void> {
        return await PostModel.getAllPost(token);
    }
}