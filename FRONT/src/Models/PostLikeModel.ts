import axios from "axios";
import PostLike from "../Types/PostLike";

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
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            await axios.post(`${import.meta.env.VITE_URL_POST_LIKE}/${idPost}`, "", config);

            return;

        } catch (error) {
            console.log('pg postLike' + error);
            return;
        }
    }

}