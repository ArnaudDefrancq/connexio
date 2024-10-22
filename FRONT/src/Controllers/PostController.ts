import { PostModel } from "../Models/PostModel";
import { newPost, PostWithProfil } from "../Types/Post";

export class PostController {
    static async createPost (post: newPost, id: number, token: string): Promise<void> {
        return await PostModel.createPost(post, id, token);
    }

    static async getAllPost (token: string): Promise<Array<PostWithProfil>> {
        return await PostModel.getAllPost(token);
    }

    static async updatePost (post: newPost, idUser: number, idPost: number, token: string): Promise<void> {
        return await PostModel.updatePost(post, idUser, idPost, token);
    }

    static async deletePost (id: number, token: string): Promise<void> {
        return await PostModel.deletePost(id, token);
    }
}