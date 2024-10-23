import axios from "axios";
import { Commentaire, CommentaireWithProfil, NewCommentaire } from "../Types/Commentaire";

export class CommentaireModel implements Commentaire {
    id_commentaire?: number;
    content: string;
    created_at: number;
    id_post: number;
    id_profil: number;

    constructor(data: Commentaire) {
        this.id_commentaire = data.id_commentaire;
        this.content = data.content;
        this.created_at = data.created_at;
        this.id_post = data.id_post;
        this.id_profil = data.id_profil;
    }

    static async createCommentaire (commentaire: NewCommentaire, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            await axios.post(`${import.meta.env.VITE_URL_COMMENTAIRE}`, commentaire, config);

            return;
        } catch (error) {
            console.log('pb add com' + error);
            return;
        }
    }

    static async getAllCommentaireWithProfil (idPost: number, token: string): Promise<Array<CommentaireWithProfil>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const allCommentaire: Array<CommentaireWithProfil> = (await axios.get(`${import.meta.env.VITE_URL_COMMENTAIRE}/${idPost}`, config)).data;

            return allCommentaire.reverse();

        } catch (error) {
            console.log('Pb getAllCommentaire' + error);
            return [];
        }
    }

    static async getOneCommentaireWithProfil (idCommentaire: number, token: string): Promise<CommentaireWithProfil> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const comWithProfil: CommentaireWithProfil = (await axios.get(`${import.meta.env.VITE_URL_COMMENTAIRE}/${idCommentaire}/commentaire`, config)).data;            

            return comWithProfil;
        } catch (error) {
            console.log("Pb error getOneCom" + error);
           throw error; 
        }
    }

    static async deleteCommentaire (idCommentaire: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };           

            await axios.delete(`${import.meta.env.VITE_URL_COMMENTAIRE}/${idCommentaire}`, config)

            return;
        } catch (error) {
            console.log('Pb delete Com' + error);
            throw error; 
        }
    }
}