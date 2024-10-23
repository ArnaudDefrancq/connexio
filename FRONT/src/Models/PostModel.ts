import { NewPost, Post, PostWithProfil } from "../Types/Post";
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

    static async createPost (post: NewPost, id:number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };
            await axios.post(`${import.meta.env.VITE_URL_POST}/${id}/post`, post, config);

            return ;
        } catch (error) {
            console.log('Pb post' + error);
            throw error;
        }
    }

    static async getAllPost (token: string): Promise<Array<PostWithProfil>> {
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
            return [];
        }
    }

    static async updatePost (post: NewPost, idUser: number, idPost: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            await axios.put(`${import.meta.env.VITE_URL_POST}/${idUser}/update/${idPost}`, post, config);

            return;
        } catch (error) {
            console.log('Pb update' + error);
            return;
        }
    }

    static async deletePost (id: number, token: string): Promise<number> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };           

            const res: number = (await axios.delete(`${import.meta.env.VITE_URL_POST}/${id}/delete`, config)).data

            return res;
        } catch (error) {
            console.log('Pb delete Post' + error);
            throw error; 
        }
    }

    static async getOnePost (idPost: number, token: string): Promise<PostWithProfil> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const postWithProfil: PostWithProfil = (await axios.get(`${import.meta.env.VITE_URL_POST}/${idPost}`, config)).data;            

            return postWithProfil;
        } catch (error) {
            console.log("Pb error getOnePostProfil" + error);
           throw error; 
        }
    }
}