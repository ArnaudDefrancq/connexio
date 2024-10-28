import axios from "axios";
import { PostLike } from "../Types/PostLike";

export class PostLikeModel implements PostLike {
    id_post_like?: number;
    id_profil: number;
    id_post: number;

    constructor(data: PostLike) {
        this.id_post_like = data.id_post_like;
        this.id_profil = data.id_profil;
        this.id_post = data.id_post
    }

    static async createPostLike (idPost: number, token: string) {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            await axios.post(`${import.meta.env.VITE_URL_POST_LIKE}`, { idPost }, config);

            return;

        } catch (error) {
            console.log('pg postLike' + error);
            return;
        }
    }

    static async getAllPostLike (idPost: number, token: string): Promise<Array<PostLike>>{
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_POST_LIKE}/${idPost}`, config);
            const allPostLike: Array<PostLike> = res.data;
            
            return allPostLike.reverse();
        } catch (error) {
            console.log('pb get All postLike' + error);
            return [];
        }
    }

    static async getOnePostLike (idPost: number, token: string): Promise<PostLike> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_POST_LIKE}/${idPost}/like`, config);
            const onePostLike: Array<PostLike> = res.data;

            return onePostLike[0];
        } catch (error) {
            console.log('pb get one postLike' + error);
            throw error;
        }
    }

    static async deletePostLike (idPostLike: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.delete(`${import.meta.env.VITE_URL_POST_LIKE}/${idPostLike}`, config)

            return res.data;
        } catch (error) {
            console.log('pb delete postLike' + error);
            return;
        }
    }

}