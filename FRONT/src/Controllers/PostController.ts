import { PostModel } from "../Models/PostModel";
import Post from "../Types/Post";

export class PostController {
    static async createPost (post: Post, id: number, token: string): Promise<void> {
        return await PostModel.createPost(post, id, token);
    }
}