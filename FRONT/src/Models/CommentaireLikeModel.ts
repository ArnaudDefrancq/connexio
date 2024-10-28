import axios from "axios";
import CommentaireLike from "../Types/CommentaireLike";

export class CommentaireLikeModel implements CommentaireLike {
    id_commentaire_like?: number;
    id_profil: number;
    id_commentaire: number;

    constructor(data: CommentaireLike) {
        this.id_commentaire_like = data.id_commentaire_like;
        this.id_commentaire = data.id_commentaire;
        this.id_profil = data.id_profil;
    }

    static async createCommentaireLike (idCommentaire: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            await axios.post(`${import.meta.env.VITE_URL_COMMENTAIRE_LIKE}`, { idCommentaire }, config);

            return;

        } catch (error) {
            console.log('pg comLike' + error);
            return;
        }
    }
    static async getAllCommentaireLike (idCommentaire: number, token:string): Promise<Array<CommentaireLike>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_COMMENTAIRE_LIKE}/${idCommentaire}`, config);
            const allComLike: Array<CommentaireLike> = res.data;
            
            return allComLike.reverse();
        } catch (error) {
            console.log('pb get All comLike' + error);
            return [];
        }
    }
    static async getOneCommentaireLike (idCommentaire: number, token: string): Promise<CommentaireLike> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_COMMENTAIRE_LIKE}/${idCommentaire}/like`, config);
            const oneComLike: Array<CommentaireLike> = res.data;

            return oneComLike[0];
        } catch (error) {
            console.log('pb get one comLike' + error);
            throw error;
        }
    }
    static async deleteCommentaireLike (idCommentaireLike: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.delete(`${import.meta.env.VITE_URL_COMMENTAIRE_LIKE}/${idCommentaireLike}`, config)

            return res.data;
        } catch (error) {
            console.log('pb delete comLike' + error);
            return;
        }
    }
}