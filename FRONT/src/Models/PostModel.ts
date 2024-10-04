import { newPost, Post, PostWithProfil } from "../Types/Post";
import axios from "axios";

export class PostModel implements Post {
    id_post?: number;
    content: string;
    media?: string | null;
    created_at: number;
    updated_at: number;
    id_profil: number;

    constructor(data: Post) {
        this.id_post = data.id_post;
        this.content = data.content;
        this.media = data.media;
        this.created_at = Number(data.created_at);
        this.updated_at = Number(data.updated_at);
        this.id_profil = Number(data.id_profil);
    }

    static async createPost (post: newPost, id:number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };
            await axios.post(`${import.meta.env.VITE_URL_POST}/${id}/post`, post, config);

            return;
        } catch (error) {
            console.log('Pb post' + error);
            return;
        }
    }

    static async getAllPost (token: string): Promise<Array<PostWithProfil> | void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const allPost: Array<PostWithProfil> = (await axios.get(import.meta.env.VITE_URL_POST, config)).data;

            return allPost.reverse();

        } catch (error) {
            console.log('Pb getAllPost' + error);
            return;
        }
    }
}